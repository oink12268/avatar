<template>
	<page>
		<back-header>검색</back-header>
		<scroll-sticky-content class="scroll-56 bd-light-grey-t01">
			<template #content>
				<div class="container ph-16">
					<div class="container mt-20 fs-15 fw-500 fc-medium-grey">메모</div>
					<div class="input-field-line-con value-check active">
						<input type="text" v-model="keyword" />
					</div>
					<div class="dp-f align-items-center mt-16">
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
					<div v-if="(budgets.length > 0 && selectedCode !== 2) || !isPayment">
						<div class="container fs-15 fw-500 fc-medium-grey mt-6">자산</div>
						<div class="toggle-item-box item-length2">
							<toggle-button
								v-for="budget in budgets.filter(b => b.isUse === 'Y')"
								:key="budget"
								:selected="budget.idx === budgetIdx"
								:is-wrap="true"
								@change="event.change.budget(budget.idx)"
							>
								{{ budget.budgetName }}
							</toggle-button>
						</div>
					</div>

					<div v-if="cards.length > 0 && selectedCode === 2 && isPayment">
						<div class="container fs-15 fw-500 fc-medium-grey mt-6">카드</div>
						<div class="toggle-item-box item-length2 item-box-max-height">
							<toggle-button
								v-for="card in cards.filter(b => b.isUse === 'Y')"
								:key="card"
								:selected="card.idx === cardIdx"
								:is-wrap="true"
								@change="event.change.card(card.idx)"
							>
								{{ card.budgetName }}
							</toggle-button>
						</div>
					</div>
					<div class="container dp-f align-items-center mt-10">
						<button class="button-rectangle size-100 large hp-54 mb-30" @click="event.search">검색</button>
					</div>

					<div
						v-for="(data, no) in datas"
						:key="no"
						class="dp-f container pv-12 pl-12 pr-8 align-items-center bdr-8 bd-light-grey mb-6"
					>
						<span class="fw-500 fc-medium-grey ellipsis" style="min-width: 40px">{{ data.date.substr(0, 10) }}</span>
						<span class="ml-40 fw-500 fc-medium-grey ellipsis" style="min-width: 40px">{{ data.memo }}</span>
						<span class="ml-at dp-if align-items-center flex-shrink-none fs-12 fc-red2">{{
							$filters.currency(data.amount)
						}}</span>
					</div>
				</div>
			</template>
		</scroll-sticky-content>
	</page>
</template>

<script>
import Page from '@/components/layouts/Page'
import BackHeader from '@/components/layouts/BackHeader'
import { provider, transaction as transactionConst } from '@/global/constants/constants'
import { toQueryString } from '@/global/utils'
import { inject, ref } from 'vue'
import TabButton from '@/components/common/TabButton'

export default {
	name: 'SearchView',
	components: {
		Page,
		BackHeader,
		TabButton,
	},
	setup() {
		const http = inject(provider.HTTP.VASELINE)
		const tabs = ref(
			Object.freeze([
				{
					code: transactionConst.TRANSACTION_TYPE[0].code,
					title: transactionConst.TRANSACTION_TYPE[0].title,
				},
				{
					code: transactionConst.TRANSACTION_TYPE[1].code,
					title: transactionConst.TRANSACTION_TYPE[1].title,
				},
				{
					code: transactionConst.TRANSACTION_TYPE[2].code,
					title: transactionConst.TRANSACTION_TYPE[2].title,
				},
			]),
		)
		const budgets = ref([])
		const cards = ref([])
		const selectedTitle = ref('이체')
		const selectedCode = ref(0)
		const budgetIdx = ref(0)
		const cardIdx = ref(0)
		const keyword = ref('')
		const datas = ref([])
		const isPayment = ref(true)
		const event = {
			change: {
				tab: (title, payload) => {
					if (selectedCode.value !== payload.code) {
						selectedCode.value = payload.code
						if (payload === 2) cardIdx.value = 0
						budgetIdx.value = 0
						selectedTitle.value = title
					}
				},
				budget: idx => {
					budgetIdx.value = budgetIdx.value === idx ? 0 : idx
				},
				card: idx => {
					cardIdx.value = cardIdx.value === idx ? 0 : idx
				},
			},
			search: () => {
				const param = {
					keyword: keyword.value,
					paymentType: selectedCode.value.toString(),
					budgetIdx: budgetIdx.value,
					cardIdx: cardIdx.value,
				}
				const paramToString = toQueryString(param)
				http.get(`/api/app/transaction/search?${paramToString}`).then(res => {
					datas.value = res
				})
			},
		}
		const getBudgets = () => {
			http.get('/api/app/budget').then(res => {
				if (res.length > 0) {
					budgets.value = res
					budgetIdx.value = budgets.value[0].idx
				}
			})
		}
		const getCards = () => {
			http.get('api/app/card').then(res => {
				cards.value = res
			})
		}
		getBudgets()
		getCards()
		return {
			budgetIdx,
			cardIdx,
			budgets,
			cards,
			keyword,
			event,
			datas,
			tabs,
			selectedTitle,
			selectedCode,
			isPayment,
		}
	},
}
</script>

<style scoped></style>
