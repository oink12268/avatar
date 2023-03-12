<template>
	<bottom-modal :is-open="isOpen" @close="event.close">
		<div v-if="!isPayment && budgets.length > 0" class="toggle-item-box item-length2 mt-12 item-box-max-height">
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
		<div class="container pv-12 fs-12 fw-500 fc-medium-grey">금액</div>
		<div class="input-field-line-con value-check active">
			<input type="number" placeholder="10,000" v-model="transaction.amount" />
		</div>

		<div class="container pv-12 fs-12 fw-500 fc-medium-grey">메모</div>
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
		const budgetIdx = ref(0)
		const transaction = ref({
			date: dayjs().format('YYYY-MM-DD'),
			categoryName: 'beauty',
			amount: 0,
			memo: '',
		})

		const event = {
			save: () => {
				if (props.isPayment)
					http.post('/api/app/payment', transaction.value).then(res => {
						emit('close', true)
					})
				else {
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
				if (props.isOpen) getBudgets()
			},
		)

		return {
			budgets,
			budgetIdx,
			transaction,
			event,
			onChange,
		}
	},
}
</script>

<style scoped></style>
