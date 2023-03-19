<template>
	<bottom-modal :is-open="isOpen" @close="event.close">
		<div class="toggle-item-box item-length2 mt-12 item-box-max-height">
			<toggle-button
				v-for="method in paymentMethod"
				:key="method"
				:selected="method.id === selected"
				:is-wrap="true"
				@change="event.select(method.id)"
			>
				{{ method.name }}
			</toggle-button>
		</div>
		<div v-if="budgets.length > 0 && selected === 0" class="toggle-item-box item-length2 mt-12 item-box-max-height">
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
		<div v-if="cards.length > 0 && selected === 1" class="toggle-item-box item-length2 mt-12 item-box-max-height">
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
		<div class="container mt-10 fs-15 fw-500 fc-medium-grey">금액</div>
		<div class="input-field-line-con value-check active">
			<input type="number" placeholder="10,000" v-model="transaction.amount" />
		</div>

		<div class="container mt-10 fs-15 fw-500 fc-medium-grey">메모</div>
		<div class="input-field-line-con value-check active">
			<input type="text" v-model="transaction.memo" />
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
import { provider } from '@/global/constants/constants'

export default {
	name: 'TransactionModal',
	emits: ['close'],
	components: { BottomModal },
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
	setup(props, { emit }) {
		const http = inject(provider.HTTP.VASELINE)
		const budgets = ref([])
		const cards = ref([])
		const budgetIdx = ref(0)
		const cardIdx = ref(0)
		const transaction = ref({
			date: dayjs().format('YYYY-MM-DD'),
			categoryName: 'beauty',
			amount: 0,
			memo: '',
		})
		const paymentMethod = ref([
			{ name: '현금', id: 0 },
			{ name: '카드', id: 1 },
		])
		const selected = ref(0)

		const event = {
			save: () => {
				if (props.isPayment) {
					if (budgetIdx.value !== null) transaction.value.budgetIdx = budgetIdx.value
					if (selected.value === 1) transaction.value.cardIdx = cardIdx.value
					http.post('/api/app/payment', transaction.value).then(res => {
						emit('close', true)
					})
				} else {
					const param = {
						amount: transaction.value.amount,
						memo: transaction.value.memo,
						budgetIdx: budgetIdx.value,
						date: props.selectedDate,
					}
					http.post('/api/app/income', param).then(res => {
						emit('close', true)
					})
				}
			},
			select: idx => {
				selected.value = idx
				if (idx === 1) cardIdx.value = 0
				budgetIdx.value = 0
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
				budgets.value = res
				budgetIdx.value = budgets.value[0].idx
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
			paymentMethod,
			selected,
			budgets,
			cards,
			budgetIdx,
			cardIdx,
			transaction,
			event,
			onChange,
		}
	},
}
</script>

<style scoped></style>
