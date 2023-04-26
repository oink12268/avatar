<template>
	<scroll-sticky-content class="scroll-56 bd-light-grey-t01">
		<template #content>
			<div class="container pa-16">
				<div class="container mb-5 fs-20 fw-500 fc-medium-grey">자산</div>
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

				<div class="container mt-20 mb-5 fs-20 fw-500 fc-medium-grey">카드</div>
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
				<div v-if="cards.length <= 0" class="flex-center pv-20 fc-grey">카드를 추가하세요.</div>

				<div class="container mt-20 mb-5 fs-20 fw-500 fc-medium-grey">자동이체</div>
				<div
					v-for="(autoPay, no) in autoPays"
					:key="no"
					class="dp-f container pv-12 pl-12 pr-8 align-items-center bdr-8 bd-light-grey mb-12"
				>
					<span class="fw-500 fc-medium-grey ellipsis" style="min-width: 40px">{{ autoPay.memo }}</span>
					<button class="ml-at dp-if align-items-center flex-shrink-none">
						<span class="fs-12 fc-blue">{{ $filters.currency(autoPay.amount) }}</span>
					</button>
				</div>

				<div class="ta-r"><img class="wh-50" :src="$filters.getImagePath('plus_big.png')" @click="event.new" /></div>
				<bottom-modal :is-open="isOpen" @close="isOpen = false">
					<div v-if="!isEdit" class="toggle-item-box item-length2 mt-12 item-box-max-height">
						<tab-button
							type="rectangle"
							style="position: relative; top: 0"
							:tabs="tabs"
							:is-custom-title="true"
							:selected="selectedTitle"
							@change="event.change.tab"
						>
							<template #customTitle0></template>
							<template #customTitle1></template>
							<template #customTitle2></template>
						</tab-button>
					</div>
					<div class="container mt-15 fs-12 fw-500 fc-medium-grey">{{ tabs[selectedCode].title }}명</div>
					<div class="input-field-line-con value-check active">
						<input type="text" placeholder="자산명 또는 카드명" v-model="budget.budgetName" />
					</div>
					<div v-if="selectedCode === 0 || selectedCode === 2">
						<div class="container mt-15 fs-12 fw-500 fc-medium-grey">금액</div>
						<div class="input-field-line-con value-check active">
							<input type="number" v-model="budget.balance" />
						</div>
					</div>
					<div v-if="selectedCode === 2">
						<div class="container mt-15 fs-12 fw-500 fc-medium-grey">날짜</div>
						<div class="input-field-line-con value-check active">
							<input type="number" placeholder="ex) 5" v-model="transferDate" />
						</div>
					</div>
					<div v-if="selectedCode === 1">
						<div class="container mt-15 fs-12 fw-500 fc-medium-grey">카드 종류</div>
						<div class="toggle-item-box item-length2 mt-6 item-box-max-height">
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
					</div>
					<div class="container mt-15 fs-12 fw-500 fc-medium-grey">이체 은행</div>
					<div class="toggle-item-box item-length2 mt-6">
						<toggle-button
							v-for="budget in budgets.filter(b => b.isUse !== 'N')"
							:key="budget"
							:selected="budget.idx === selectedBudget"
							:is-wrap="true"
							class="hp-10 pv-5"
							@change="onChangeBudget(budget.idx)"
						>
							{{ budget.budgetName }}
						</toggle-button>
					</div>

					<div v-if="selectedCode === 2">
						<div class="container mt-15 fs-12 fw-500 fc-medium-grey">입금 은행</div>
						<div class="toggle-item-box item-length2 mt-6">
							<toggle-button
								v-for="budget in budgets.filter(b => b.budgetName !== '현금')"
								:key="budget"
								:selected="budget.idx === selectedBudgetDeposit"
								:is-wrap="true"
								class="hp-10 pv-5"
								@change="onChangeDepositBudget(budget.idx)"
							>
								{{ budget.budgetName }}
							</toggle-button>
						</div>
					</div>

					<div class="dp-f container align-items-center mt-15">
						<div class="flex1 fw-500 ellipsis fs-16">사용여부</div>
						<div class="ml-at dp-if align-items-center">
							<switch-button id="DELIVERY_COMPLETE" v-model="isUse" />
						</div>
					</div>
					<div class="container dp-f align-items-center mt-15">
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
import { provider, budget as budgetConst } from '@/global/constants/constants'
import SwitchButton from '@/components/common/SwitchButton'
import TabButton from '@/components/common/TabButton'
import globalComposable from '@/composables/globalComposable'

export default {
	name: 'BudgetView',
	components: { BudgetModal, BottomModal, SwitchButton, TabButton },
	setup() {
		const { alert } = globalComposable()
		const http = inject(provider.HTTP.VASELINE)
		const isOpen = ref(false)
		const isEdit = ref(false)
		const budgets = ref([])
		const cards = ref([])
		const autoPays = ref([])
		const budget = ref({
			idx: 1,
			budgetName: '',
			name: '',
			balance: 0,
			isUse: 'Y',
			isCredit: 'Y',
		})
		const autoPay = ref({
			name: '',
			balance: 0,
			fromIdx: 0,
			toIdx: 0,
			isUse: 'Y',
		})
		const selectedCard = ref(0)
		const selectedBudget = ref(0)
		const selectedBudgetDeposit = ref(0)
		const transferDate = ref(0)

		const tabs = ref(
			Object.freeze([
				{
					code: budgetConst.BUDGET_TYPE[0].code,
					title: budgetConst.BUDGET_TYPE[0].title,
				},
				{
					code: budgetConst.BUDGET_TYPE[1].code,
					title: budgetConst.BUDGET_TYPE[1].title,
				},
				{
					code: budgetConst.BUDGET_TYPE[2].code,
					title: budgetConst.BUDGET_TYPE[2].title,
				},
			]),
		)
		const selectedTitle = ref('자산')
		const selectedCode = ref(0)

		const cardKinds = ref([
			{ name: '체크카드', id: 0 },
			{ name: '신용카드', id: 1 },
		])
		const isUse = ref(true)
		const isCredit = ref(true)

		const event = {
			save: () => {
				budget.value.isUse = isUse.value ? 'Y' : 'N'
				if (selectedCode.value === 0) {
					if (isEdit.value) {
						http.patch('/api/app/budget', budget.value).then(res => {
							isOpen.value = false
						})
					} else {
						http.post('/api/app/budget', budget.value).then(res => {
							isOpen.value = false
						})
					}
				} else if (selectedCode.value === 1) {
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
				} else if (selectedCode.value === 2) {
					budget.value.budgetIdx = selectedBudget.value
					budget.value.budgetDepositIdx = selectedBudgetDeposit.value
					budget.value.transferDate = transferDate.value

					http.post('/api/app/auto-pay', budget.value).then(res => {
						isOpen.value = false
					})

					console.log(budget.value)
				}
			},
			change: {
				tab: (title, payload) => {
					if (selectedCode.value !== payload.code) {
						selectedCode.value = payload.code
						selectedTitle.value = title
					}
				},
			},
			detail: (isBudget, data) => {
				selectedCode.value = isBudget ? 0 : 1
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

		const onChangeCard = idx => {
			selectedCard.value = idx
		}

		const onChangeBudget = idx => {
			selectedBudget.value = selectedBudget.value === idx ? 0 : idx
		}

		const onChangeDepositBudget = idx => {
			selectedBudgetDeposit.value = selectedBudgetDeposit.value === idx ? 0 : idx
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

		const getAutoPays = () => {
			http.get('api/app/auto-pay').then(res => {
				autoPays.value = res
			})
		}
		getBudgets()
		getCards()
		getAutoPays()

		watch(
			() => isOpen.value,
			_ => {
				if (!isOpen.value) {
					getBudgets()
					getCards()
					getAutoPays()
				}
			},
		)

		return {
			budgets,
			cards,
			autoPays,
			tabs,
			budget,
			isOpen,
			isEdit,
			isUse,
			isCredit,
			event,
			selectedCard,
			onChangeCard,
			onChangeBudget,
			onChangeDepositBudget,
			selectedBudget,
			selectedBudgetDeposit,
			cardKinds,
			selectedTitle,
			selectedCode,
			autoPay,
			transferDate,
		}
	},
}
</script>

<style scoped></style>
