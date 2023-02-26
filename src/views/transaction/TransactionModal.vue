<template>
	<div class="ta-r"><img class="wh-50" :src="$filters.getImagePath('plus_big.png')" @click="isOpen = true" /></div>

	<bottom-modal :is-open="isOpen" @close="isOpen = false">
		<div class="container pv-12 fs-12 fw-500 fc-medium-grey">금액</div>
		<div class="input-field-line-con value-check active">
			<input type="number" placeholder="10,000" v-model="transaction.amount" />
		</div>

		<div class="container pv-12 fs-12 fw-500 fc-medium-grey">메모</div>
		<div class="input-field-line-con value-check active">
			<input type="text" v-model="transaction.memo" />
		</div>
		<div class="container dp-f align-items-center mt-10">
			<button class="button-rectangle size-50 large hp-54" @click="event.save(true)">수입</button>
			<button class="button-rectangle size-50 large hp-54" @click="event.save(false)">지출</button>
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
	components: { BottomModal },
	props: {
		selectedDate: {
			type: String,
			default: dayjs().format('YYYY-MM-DD'),
		},
	},
	setup(props) {
		const isOpen = ref(false)
		const transaction = ref({
			date: dayjs().format('YYYY-MM-DD'),
			categoryName: 'beauty',
			amount: 0,
			memo: '',
		})

		const event = {
			save: isIncome => {
				if (isIncome === true) {
					console.log('transaction data: ', transaction.value)
					console.log('income')
				} else {
					console.log('transaction data: ', transaction.value)
					axios.post('/api/app/payment', transaction.value).then(res => {
						console.log('KSH::payment', res.data)
					})
				}
			},
		}

		watch(
			() => props.selectedDate,
			_ => {
				transaction.value.date = props.selectedDate
				console.log('TransactionModal::watch', props.selectedDate)
			},
		)

		return {
			transaction,
			isOpen,
			event,
		}
	},
}
</script>

<style scoped></style>
