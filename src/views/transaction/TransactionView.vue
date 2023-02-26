<template>
	<div class="container ph-16">
		<calendar @selectedDate="event.change" />
		<transaction-modal :selected-date="selectedDate" />
	</div>
</template>

<script>
import { ref } from 'vue'
import Calendar from '@/views/transaction/Calendar'
import TransactionModal from '@/views/transaction/TransactionModal'

export default {
	name: 'TransactionView',
	components: { TransactionModal, Calendar },
	setup() {
		const selectedDate = ref('')
		const event = {
			change: date => {
				selectedDate.value = date.format('YYYY-MM-DD')
			},
		}
		return {
			selectedDate,
			event,
		}
	},
}
</script>

<style scoped></style>
