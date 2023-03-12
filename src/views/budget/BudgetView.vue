<template>
	<scroll-sticky-content class="scroll-56 bd-light-grey-t01">
		<template #content>
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
					<div class="dp-f container align-items-center mt-30">
						<div class="flex1 fw-500 ellipsis fs-16">사용여부</div>
						<div class="ml-at dp-if align-items-center">
							<switch-button id="DELIVERY_COMPLETE" v-model="isUse" />
						</div>
					</div>
					<div class="container dp-f align-items-center mt-30">
						<button class="button-rectangle size-100 large hp-54" @click="event.save">
							{{ isEdit ? '수정' : '저장' }}
						</button>
					</div>
				</bottom-modal>
			</div>
		</template>
	</scroll-sticky-content>
</template>

<script>
import { inject, ref } from 'vue'
import BudgetModal from '@/views/budget/BudgetModal'
import BottomModal from '@/components/popup/BottomModal'
import { provider } from '@/global/constants/constants'
import SwitchButton from '@/components/common/SwitchButton'
export default {
	name: 'BudgetView',
	components: { BudgetModal, BottomModal, SwitchButton },
	setup() {
		const http = inject(provider.HTTP.VASELINE)
		const isOpen = ref(false)
		const isEdit = ref(false)
		const budgets = ref([])
		const budget = ref({
			idx: 1,
			budgetName: '',
			balance: 0,
			isUse: 'Y',
		})
		const isUse = ref(true)

		const event = {
			save: () => {
				budget.value.isUse = isUse.value ? 'Y' : 'N'
				if (isEdit.value) {
					http.patch('/api/app/budget', budget.value).then(res => {
						isOpen.value = false
					})
				} else {
					http.post('/api/app/budget', budget.value).then(res => {
						isOpen.value = false
					})
				}
			},
			detail: data => {
				budget.value.idx = data.idx
				budget.value.budgetName = data.budgetName
				budget.value.balance = data.balance
				isUse.value = data.isUse === 'Y' ? true : false
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
			http.get('/api/app/budget').then(res => {
				budgets.value = res
			})
		}
		getBudgets()

		return {
			budgets,
			budget,
			isOpen,
			isEdit,
			isUse,
			event,
		}
	},
}
</script>

<style scoped></style>
