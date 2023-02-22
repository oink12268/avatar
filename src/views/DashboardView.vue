<template>
	<div class="container ph-16">
		<calendar @selectedDate="event.change" />
		<transaction-modal />
	</div>
</template>

<script>
import { ref } from 'vue'
import Calendar from '@/views/components/Calendar'
import TransactionModal from '@/views/components/TransactionModal'

export default {
	name: 'DashboardView',
	components: { TransactionModal, Calendar },
	setup() {
		const event = {
			change: date => {
				console.log('date', date)
			},
		}
		const selectedDate = ref('')
		return {
			selectedDate,
			event,
		}
	},
}
</script>

<style scoped></style>
