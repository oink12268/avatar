<template>
	<scroll-sticky-content class="scroll-56 bd-light-grey-t01">
		<template #content>
			<div class="container pa-16">
				<div class="container pv-12 fs-20 fw-500 fc-medium-grey">자산</div>
				<div
					v-for="(budget, no) in budgets"
					:key="no"
					class="dp-f container pv-12 pl-12 pr-8 align-items-center bdr-8 bd-light-grey mb-12"
					@click="event.detail(true, budget)"
				>
					<span class="fw-500 fc-medium-grey ellipsis" style="min-width: 40px">{{ budget.budgetName }}</span>
					<button class="ml-at dp-if align-items-center flex-shrink-none">
						<span class="fs-12 fc-blue">{{ $filters.currency(budget.balance) }}</span>
					</button>
				</div>

				<div class="container pv-12 fs-20 fw-500 fc-medium-grey">카드</div>
				<div
					v-for="(card, no) in cards"
					:key="no"
					class="dp-f container pv-12 pl-12 pr-8 align-items-center bdr-8 bd-light-grey mb-12"
					@click="event.detail(false, card)"
				>
					<span class="fw-500 fc-medium-grey ellipsis" style="min-width: 40px">{{ card.budgetName }}</span>
					<button class="ml-at dp-if align-items-center flex-shrink-none">
						<span class="fs-12 fc-blue">{{ card.budget }}</span>
					</button>
				</div>

				<div class="ta-r"><img class="wh-50" :src="$filters.getImagePath('plus_big.png')" @click="event.new" /></div>
				<bottom-modal :is-open="isOpen" @close="isOpen = false">
					<div class="toggle-item-box item-length2 mt-12 item-box-max-height">
						<toggle-button
							v-for="select in selects"
							:key="select"
							:selected="select.id === selected"
							:is-wrap="true"
							@change="onChange(select.id)"
						>
							{{ select.name }}
						</toggle-button>
					</div>

					<div class="container mt-30 fs-12 fw-500 fc-medium-grey">{{ selected === 0 ? '자산명' : '카드명' }}</div>
					<div class="input-field-line-con value-check active">
						<input type="text" placeholder="자산명 또는 카드명" v-model="budget.budgetName" />
					</div>

					<div v-if="selected === 0" class="container mt-30 fs-12 fw-500 fc-medium-grey">금액</div>
					<div v-if="selected === 0" class="input-field-line-con value-check active">
						<input type="number" v-model="budget.balance" />
					</div>
					<div v-if="selected === 1" class="container mt-30 fs-12 fw-500 fc-medium-grey">카드 종류</div>
					<div v-if="selected === 1" class="toggle-item-box item-length2 mt-6 item-box-max-height">
						<toggle-button
							v-for="card in cardKinds"
							:key="card"
							:selected="card.id === selectedCard"
							:is-wrap="true"
							@change="onChangeCard(card.id)"
						>
							{{ card.name }}
						</toggle-button>
					</div>

					<div v-if="selected === 1 && selectedCard === 0" class="container mt-30 fs-12 fw-500 fc-medium-grey">
						카드 은행
					</div>
					<div
						v-if="selected === 1 && selectedCard === 0"
						class="toggle-item-box item-length2 mt-6 item-box-max-height"
					>
						<toggle-button
							v-for="budget in budgets.filter(b => b.budgetName !== '현금')"
							:key="budget"
							:selected="budget.idx === selectedBudget"
							:is-wrap="true"
							@change="onChangeBudget(budget.idx)"
						>
							{{ budget.budgetName }}
						</toggle-button>
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
import { inject, ref, watch } from 'vue'
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
		const cards = ref([])
		const budget = ref({
			idx: 1,
			budgetName: '',
			name: '',
			balance: 0,
			isUse: 'Y',
			isCredit: 'Y',
		})
		const selected = ref(0)
		const selectedCard = ref(0)
		const selectedBudget = ref(0)
		const selects = ref([
			{ name: '자산', id: 0 },
			{ name: '카드', id: 1 },
		])
		const cardKinds = ref([
			{ name: '체크카드', id: 0 },
			{ name: '신용카드', id: 1 },
		])
		const isUse = ref(true)
		const isCredit = ref(true)

		const event = {
			save: () => {
				budget.value.isUse = isUse.value ? 'Y' : 'N'
				if (selected.value === 0) {
					if (isEdit.value) {
						http.patch('/api/app/budget', budget.value).then(res => {
							isOpen.value = false
						})
					} else {
						http.post('/api/app/budget', budget.value).then(res => {
							isOpen.value = false
						})
					}
				} else {
					// budget.value.isCredit = isCredit.value ? 'Y' : 'N'
					budget.value.isCredit = selectedCard.value === 0 ? 'N' : 'Y'
					budget.value.budgetIdx = selectedBudget.value
					if (isEdit.value) {
						http.patch('/api/app/card', budget.value).then(res => {
							isOpen.value = false
						})
					} else {
						http.post('/api/app/card', budget.value).then(res => {
							isOpen.value = false
						})
					}
				}
			},
			detail: (isBudget, data) => {
				onChange(isBudget ? 0 : 1)
				budget.value.idx = data.idx
				budget.value.budgetName = data.budgetName
				budget.value.balance = data.balance
				isUse.value = data.isUse === 'Y' ? true : false
				selectedCard.value = data.isCredit === 'Y' ? 1 : 0
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
		const onChange = idx => {
			selected.value = idx
		}

		const onChangeCard = idx => {
			selectedCard.value = idx
		}

		const onChangeBudget = idx => {
			selectedBudget.value = idx
		}

		const getBudgets = () => {
			http.get('/api/app/budget').then(res => {
				budgets.value = res
			})
		}

		const getCards = () => {
			http.get('api/app/card').then(res => {
				cards.value = res
			})
		}
		getBudgets()
		getCards()

		watch(
			() => isOpen.value,
			_ => {
				if (!isOpen.value) {
					getBudgets()
					getCards()
				}
			},
		)

		return {
			budgets,
			cards,
			selects,
			budget,
			isOpen,
			isEdit,
			isUse,
			isCredit,
			event,
			selected,
			selectedCard,
			onChange,
			onChangeCard,
			onChangeBudget,
			selectedBudget,
			cardKinds,
		}
	},
}
</script>

<style scoped></style>
