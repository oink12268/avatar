<template>
	<bottom-modal :is-open="isOpen" @close="event.close">
		<div class="container pv-12 fs-12 fw-500 fc-medium-grey">금액</div>
		<div class="input-field-line-con value-check active">
			<input type="number" placeholder="10,000" v-model="transaction.amount" />
		</div>

		<div class="container pv-12 fs-12 fw-500 fc-medium-grey">메모</div>
		<div class="input-field-line-con value-check active">
			<input type="text" v-model="transaction.memo" />
		</div>
		<div class="container dp-f align-items-center mt-10">
			<button class="button-rectangle size-100 large hp-54" @click="event.save(true)">저장</button>
		</div>
	</bottom-modal>
</template>

<script>
import { ref, watch } from 'vue'
import BottomModal from '@/components/popup/BottomModal'
import axios from 'axios'
import dayjs from 'dayjs'

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
		const transaction = ref({
			date: dayjs().format('YYYY-MM-DD'),
			categoryName: 'beauty',
			amount: 0,
			memo: '',
		})

		const event = {
			save: isIncome => {
				axios.post('/api/app/payment', transaction.value).then(res => {})
			},
			close: () => {
				emit('close')
			},
		}

		watch(
			() => props.selectedDate,
			_ => {
				transaction.value.date = props.selectedDate
			},
		)

		return {
			transaction,
			event,
		}
	},
}
</script>

<style scoped></style>
