<template>
	<div class="container pa-16">
		<div
			v-for="(budget, no) in budgets"
			:key="no"
			class="dp-f container pv-12 pl-12 pr-8 align-items-center bdr-8 bd-light-grey mb-12"
			@click="event.detail(budget)"
		>
			<span class="fw-500 fc-medium-grey ellipsis" style="min-width: 40px">{{ budget.budgetName }}</span>
			<button class="ml-at dp-if align-items-center flex-shrink-none">
				<span class="fs-12 fc-blue">{{ $filters.currency(budget.balance) }}</span>
			</button>
		</div>

		<div class="ta-r"><img class="wh-50" :src="$filters.getImagePath('plus_big.png')" @click="event.new" /></div>
		<bottom-modal :is-open="isOpen" @close="isOpen = false">
			<div class="container pv-12 fs-12 fw-500 fc-medium-grey">자산명</div>
			<div class="input-field-line-con value-check active">
				<input type="text" placeholder="국민은행(적금)" v-model="budget.budgetName" />
			</div>

			<div class="container pv-12 fs-12 fw-500 fc-medium-grey">금액</div>
			<div class="input-field-line-con value-check active">
				<input type="number" v-model="budget.balance" />
			</div>
			<div class="container dp-f align-items-center mt-10">
				<button class="button-rectangle size-100 large hp-54" @click="event.save">
					{{ isEdit ? '수정' : '저장' }}
				</button>
			</div>
		</bottom-modal>
	</div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import BudgetModal from '@/views/budget/BudgetModal'
import BottomModal from '@/components/popup/BottomModal'
export default {
	name: 'BudgetView',
	components: { BudgetModal, BottomModal },
	setup() {
		const isOpen = ref(false)
		const isEdit = ref(false)
		const budgets = ref([])
		const budget = ref({
			budgetName: '',
			balance: 0,
		})

		const event = {
			save: () => {
				axios.post('/api/app/budget', budget.value).then(res => {
					isOpen.value = false
				})
			},
			detail: data => {
				budget.value.budgetName = data.budgetName
				budget.value.balance = data.balance
				isOpen.value = true
				isEdit.value = true
			},
			new: () => {
				budget.value.budgetName = ''
				budget.value.balance = 0
				isOpen.value = true
				isEdit.value = false
			},
		}

		const getBudgets = () => {
			axios.get('/api/app/budget').then(res => {
				budgets.value = res.data
			})
		}
		getBudgets()

		return {
			budgets,
			budget,
			isOpen,
			isEdit,
			event,
		}
	},
}
</script>

<style scoped></style>
