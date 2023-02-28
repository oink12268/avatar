<template>
	<div class="container ph-16">
		<calendar @selectedDate="event.change" />
		<div class="container dp-f align-items-center mt-20">
			<button class="button-rectangle size-50 large hp-54" @click="event.open(false)">수입</button>
			<button class="button-rectangle size-50 large hp-54" @click="event.open(true)">지출</button>
		</div>
		<transaction-modal
			:is-open="isOpen"
			:is-payment="isPayment"
			:selected-date="selectedDate"
			@close="isOpen = false"
		/>
	</div>
</template>

<script>
import { inject, ref } from 'vue'
import Calendar from '@/views/transaction/Calendar'
import TransactionModal from '@/views/transaction/TransactionModal'
import dayjs from 'dayjs'
import axios from 'axios'
import { provider } from '@/global/constants/constants'

export default {
	name: 'TransactionView',
	components: { TransactionModal, Calendar },
	setup() {
		const http = inject(provider.HTTP.VASELINE)
		const selectedDate = ref(dayjs().format('YYYY-MM-DD'))
		const isPayment = ref(false)
		const isOpen = ref(false)
		const event = {
			change: date => {
				selectedDate.value = date.format('YYYY-MM-DD')
			},
			open: isPay => {
				isPayment.value = isPay
				isOpen.value = true
			},
		}

		const param = {
			date: selectedDate.value,
		}

		const getTransaction = () => {
			http.get('/api/app/transaction', param).then(res => {
				console.log('res', res)
			})
		}
		getTransaction()
		return {
			selectedDate,
			isPayment,
			isOpen,
			event,
		}
	},
}
</script>

<style scoped></style>
