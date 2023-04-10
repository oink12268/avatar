<template>
	<bottom-modal :is-open="isOpen" @close="event.close">
		<div v-if="isPayment" class="dp-f align-items-center mt-16">
			<tab-button
				type="rectangle"
				style="position: relative; top: 0"
				:tabs="tabs"
				:is-custom-title="true"
				:selected="selectedTitle"
				@change="event.change.tab"
			>
				<template #customTitle0></template>
				<template #customTitle1></template>
				<template #customTitle2></template>
			</tab-button>
		</div>
		<div
			v-if="(budgets.length > 0 && selectedCode !== 2) || !isPayment"
			class="toggle-item-box item-length2 mt-12 item-box-max-height"
		>
			<div class="container fs-15 fw-500 fc-medium-grey">자산</div>
			<toggle-button
				v-for="budget in budgets.filter(b => b.isUse === 'Y')"
				:key="budget"
				:selected="budget.idx === budgetIdx"
				:is-wrap="true"
				@change="onChange(budget.idx)"
			>
				{{ budget.budgetName }}
			</toggle-button>
		</div>
		<div
			v-if="cards.length > 0 && selectedCode === 2 && isPayment"
			class="toggle-item-box item-length2 mt-12 item-box-max-height"
		>
			<div class="container fs-15 fw-500 fc-medium-grey">카드</div>
			<toggle-button
				v-for="card in cards.filter(b => b.isUse === 'Y')"
				:key="card"
				:selected="card.idx === cardIdx"
				:is-wrap="true"
				@change="event.selectCard(card)"
			>
				{{ card.budgetName }}
			</toggle-button>
		</div>

		<div class="container mt-10 fs-15 fw-500 fc-medium-grey">메모</div>
		<div class="input-field-line-con value-check active">
			<input type="text" v-model="transaction.memo" />
		</div>

		<div class="container mt-10 fs-15 fw-500 fc-medium-grey">금액</div>
		<div class="input-field-line-con value-check active">
			<input type="number" placeholder="10,000" v-model="transaction.amount" />
		</div>

		<div v-if="selectedCode === 1">
			<div class="container mt-10 fs-15 fw-500 fc-medium-grey">이체 금액</div>
			<div class="input-field-line-con value-check active">
				<input type="number" placeholder="10,000" v-model="payAmount" />
			</div>
		</div>

		<div class="container dp-f align-items-center mt-10">
			<button class="button-rectangle size-100 large hp-54" @click="event.save">저장</button>
		</div>
	</bottom-modal>
</template>

<script>
import { inject, ref, watch } from 'vue'
import BottomModal from '@/components/popup/BottomModal'
import dayjs from 'dayjs'
import { provider, transaction as transactionConst } from '@/global/constants/constants'
import globalComposable from '@/composables/globalComposable'
import TabButton from '@/components/common/TabButton'
export default {
	name: 'TransactionModal',
	emits: ['close'],
	components: { BottomModal, TabButton },
	props: {
		isOpen: {
			type: Boolean,
			default: false,
		},
		isPayment: {
			type: Boolean,
			default: true,
		},
		selectedDate: {
			type: String,
			default: dayjs().format('YYYY-MM-DD'),
		},
	},
	metaInfo: {
		title: 'TransactionModalMeta',
		meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=0' }],
	},
	setup(props, { emit }) {
		const { alert } = globalComposable()
		const http = inject(provider.HTTP.VASELINE)
		const budgets = ref([])
		const cards = ref([])
		const budgetIdx = ref(0)
		const cardIdx = ref(0)
		const transaction = ref({
			date: dayjs().format('YYYY-MM-DD'),
			categoryName: 'beauty',
			amount: '',
			memo: '',
		})
		const payAmount = ref(0)
		const tabs = ref(
			Object.freeze([
				{
					code: transactionConst.TRANSACTION_TYPE[0].code,
					title: transactionConst.TRANSACTION_TYPE[0].title,
				},
				{
					code: transactionConst.TRANSACTION_TYPE[1].code,
					title: transactionConst.TRANSACTION_TYPE[1].title,
				},
				{
					code: transactionConst.TRANSACTION_TYPE[2].code,
					title: transactionConst.TRANSACTION_TYPE[2].title,
				},
			]),
		)
		const selectedCode = ref(0)
		const selectedTitle = ref('현금')

		const event = {
			save: () => {
				if (props.isPayment) {
					if (budgetIdx.value !== null) transaction.value.budgetIdx = budgetIdx.value
					if (selectedCode.value === 1) {
						if (budgetIdx.value === 0) {
							alert('자산을 선택해 주세요')
							return
						}
						transaction.value.payAmount = payAmount.value
					}
					if (selectedCode.value === 2) transaction.value.cardIdx = cardIdx.value
					http.post('/api/app/payment', transaction.value).then(res => {
						budgetIdx.value = 0
						cardIdx.value = 0
						emit('close', true)
					})
				} else {
					const param = {
						amount: transaction.value.amount,
						memo: transaction.value.memo,
						budgetIdx: budgetIdx.value,
						date: props.selectedDate,
					}
					http.post('/api/app/income', param).then(_ => {
						emit('close', true)
					})
				}
			},
			change: {
				tab: (title, payload) => {
					if (selectedCode.value !== payload.code) {
						selectedCode.value = payload.code
						if (payload === 2) cardIdx.value = 0
						budgetIdx.value = 0
						selectedTitle.value = title
					}
				},
			},
			selectCard: card => {
				budgetIdx.value = card.budgetIdx
				cardIdx.value = card.idx
			},
			close: () => {
				emit('close')
			},
		}

		const getBudgets = () => {
			http.get('/api/app/budget').then(res => {
				if (res.length > 0) {
					budgets.value = res
					budgetIdx.value = budgets.value[0].idx
				}
			})
		}

		const getCards = () => {
			http.get('api/app/card').then(res => {
				cards.value = res
			})
		}

		const onChange = idx => {
			budgetIdx.value = idx
		}

		watch(
			() => props.selectedDate,
			_ => {
				transaction.value.date = props.selectedDate
			},
		)
		watch(
			() => props.isOpen,
			_ => {
				if (props.isOpen) {
					getBudgets()
					getCards()
				}
			},
		)

		return {
			selectedCode,
			budgets,
			tabs,
			cards,
			budgetIdx,
			payAmount,
			cardIdx,
			transaction,
			event,
			selectedTitle,
			onChange,
		}
	},
}
</script>

<style scoped></style>
