<template>
	<div class="container pa-16">
		<div
			v-for="budget in budgets"
			:key="budget.idx"
			class="dp-f container pv-12 pl-12 pr-8 align-items-center bdr-8 bd-light-grey mb-12"
		>
			<span class="fw-500 fc-medium-grey ellipsis" style="min-width: 40px">{{ budget.budgetName }}</span>
			<button class="ml-at dp-if align-items-center flex-shrink-none">
				<span class="fs-12 fc-blue">{{ budget.balance }}</span>
			</button>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
export default {
	name: 'BudgetView',
	setup() {
		const budgets = ref([])

		const getBudgets = () => {
			axios.get('/api/app/budget').then(res => {
				budgets.value = res.data
				console.log('budgets', budgets.value)
			})
		}
		getBudgets()

		return {
			budgets,
		}
	},
}
</script>

<style scoped></style>
