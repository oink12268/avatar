<template>
	<scroll-sticky-content class="scroll-56 bd-light-grey-t01">
		<template #content>
			<div class="container ph-16">
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
					</tab-button>
				</div>
				<date-range :mode="dateType.MONTH" :to-date="today" @selectedDate="event.change.date" />
				<div class="pa-12 bdr-8 bg-light-grey2">
					<div class="container dp-f align-items-center">
						<div class="fs-24 fw-900 flex-shrink-none">{{ selectedDate.get('M') + 1 }}월</div>
						<div class="dp-ib wd-1 hp-48 bg-light-grey mh-12 fs-16 fw-500 flex-shrink-none" />
						<div class="flex1 lh-13">
							<div class="dp-f">
								<div class="ml-50 fs-18 fw-900 fc-grey">수입</div>
								<div class="ml-at fs-18 fw-900 fc-grey">{{ $filters.currency(incomeSumAmount) }}원</div>
							</div>
							<div class="dp-f mt-5">
								<div class="ml-50 fs-18 fw-900 fc-grey">지출</div>
								<div class="ml-at fs-18 fw-900 fc-grey">{{ $filters.currency(paymentSumAmount) }}원</div>
							</div>
						</div>
					</div>
				</div>
				<payment-pie-chart :from-date="fromDate" :to-date="toDate" />
			</div>
		</template>
	</scroll-sticky-content>
</template>

<script>
import { inject, ref } from 'vue'
import TabButton from '@/components/common/TabButton'
import { statistics as statisticsConst, dateType, provider } from '@/global/constants/constants'
import DateRange from '@/views/transaction/DateRange'
import dayjs from 'dayjs'
import { toQueryString } from '@/global/utils'
import PaymentPieChart from '@/views/statistics/PaymentPieChart'

export default {
	name: 'StatisticsView',
	components: { PaymentPieChart, TabButton, DateRange },
	setup() {
		const http = inject(provider.HTTP.VASELINE)
		const selectedTitle = ref('월간')
		const selectedCode = ref(0)
		const today = ref(dayjs().format('YYYY-MM-DD'))
		const selectedDate = ref(dayjs())
		const incomeSumAmount = ref(0)
		const paymentSumAmount = ref(0)
		const fromDate = ref('')
		const toDate = ref('')

		const tabs = ref(
			Object.freeze([
				{
					code: statisticsConst.STATISTICS_REPORT_TYPE[0].code,
					title: statisticsConst.STATISTICS_REPORT_TYPE[0].title,
				},
				{
					code: statisticsConst.STATISTICS_REPORT_TYPE[1].code,
					title: statisticsConst.STATISTICS_REPORT_TYPE[1].title,
				},
			]),
		)

		const event = {
			change: {
				tab: (title, payload) => {
					if (selectedCode.value !== payload.code) {
						selectedCode.value = payload.code
						selectedTitle.value = title
					}
				},
				date: (refresh = false, date) => {
					selectedDate.value = selectedDate.value.set('M', dayjs(date).get('M'))
					fromDate.value = selectedDate.value.set('D', 1).format('YYYY-MM-DD')
					toDate.value = dayjs(date).set('D', dayjs(date).daysInMonth()).format('YYYY-MM-DD')
					const param = {
						fromDate: fromDate.value,
						toDate: toDate.value,
					}

					const paramToString = toQueryString(param)

					http.get(`/api/app/statistics/summary?${paramToString}`).then(res => {
						incomeSumAmount.value = res.incomeAmount ? res.incomeAmount : 0
						paymentSumAmount.value = res.paymentAmount ? res.paymentAmount : 0
					})
				},
			},
		}

		return {
			tabs,
			selectedTitle,
			event,
			dateType,
			today,
			selectedCode,
			selectedDate,
			incomeSumAmount,
			paymentSumAmount,
			fromDate,
			toDate,
		}
	},
}
</script>

<style scoped>
.fc-green2 {
	color: #87a652 !important;
}

.fc-red2 {
	color: #e1766f !important;
}
</style>
