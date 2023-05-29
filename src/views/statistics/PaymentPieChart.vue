<template>
	<div class="dp-f pt-30 align-items-center">
		<div class="fs-21 fw-900">결제타입별 지출</div>
	</div>
	<div class="container pv-12">
		<vue3-chart-js ref="payPieChartRef" v-bind="{ ...payPieChart }" />
	</div>
	<pie-detail-list :header-datas="headerDatas">
		<template v-if="viewListDatas.length > 0">
			<div class="container ph-12 pv-6 fs-14">
				<template v-for="(data, no) in viewListDatas" :key="no">
					<template v-if="no === 0">
						<div class="dp-f align-items-center container pv-6">
							<div class="flex1 ellipsis">
								<span>합계</span>
							</div>
							<div class="wd-50 ta-c flex-shrink-none">100%</div>
							<div class="wd-50 ta-c flex-shrink-none">{{ $filters.currency(totalData.paymentCount) }}</div>
							<div class="wd-100 ta-r flex-shrink-none fc-dark-grey fw-900">
								{{ $filters.currency(totalData.paymentAmount) }}
							</div>
						</div>
					</template>
					<div class="dp-f align-items-center container pv-6">
						<div class="flex1 ellipsis">
							<span
								class="color-thumbnail"
								:style="{
									backgroundColor: no < 6 ? color.COLOR_LIST.FIXED_COLOR[no] : color.COLOR_LIST.FIXED_COLOR[5],
								}"
							></span>
							<span class="ml-3 ellipsis">{{ data.methodName }} </span>
						</div>
						<div class="wd-50 ta-c flex-shrink-none">{{ data.rate }}%</div>
						<div class="wd-50 ta-c flex-shrink-none">{{ $filters.currency(data.paymentCount) }}</div>
						<div class="wd-100 ta-r flex-shrink-none fc-dark-grey fw-900">
							{{ $filters.currency(data.paymentAmount) }}
						</div>
					</div>
				</template>
			</div>
			<div v-if="isMore" class="container ta-c" @click="event.isMore">
				<button class="button-outline dp-if align-items-center small hp-24 fc-dark-grey bd-light-grey ph-12 bdr-12">
					<i class="ic24_plus_bold wh-12 ic_dark-grey"></i>
					<span class="fs-12">더보기</span>
				</button>
			</div>
		</template>
		<template v-else>
			<div class="flex-center pv-36 fc-grey">지출이 없습니다.</div>
		</template>
	</pie-detail-list>
</template>

<script>
import chartComposable from '@/composables/chartComposable'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import { inject, ref, nextTick, watch } from 'vue'
import { provider } from '@/global/constants/constants'
import { currency, getEllipsis, toQueryString } from '@/global/utils'
import PieDetailList from '@/views/statistics/PieDetailList'
export default {
	name: 'PaymentPieChart',
	components: { Vue3ChartJs, PieDetailList },
	props: {
		fromDate: {
			type: String,
			default: '',
		},
		toDate: {
			type: String,
			default: '',
		},
	},
	setup(props) {
		const { color, pieChart, getFixedColors } = chartComposable()
		const payPieChartRef = ref(null)
		const payPieChart = pieChart
		payPieChart.plugins = [ChartDataLabels]
		const http = inject(provider.HTTP.VASELINE)
		const totalData = ref()
		const listDatas = ref([])
		const viewListDatas = ref([])
		const isMore = ref(false)

		const headerDatas = ref([
			{ title: '구분', class: 'flex1 ellipsis' },
			{ title: '점유율', class: 'wd-50 ta-c flex-shrink-none' },
			{ title: '건수', class: 'wd-50 ta-c flex-shrink-none' },
			{ title: '금액(원)', class: 'wd-100 ta-r flex-shrink-none' },
		])

		const setChartDefaultOption = () => {
			payPieChart.data.labels = []
			payPieChart.data.datasets[0].backgroundColor = [color.COLOR_LIST.DEFAULT_COLOR]
			payPieChart.data.datasets[0].data = [1]
			payPieChart.options.plugins.tooltip = false
			payPieChart.data.datasets[0].datalabels.labels.name.display = false
			payPieChart.options.plugins.legend.display = false
		}

		const getData = () => {
			const param = {
				fromDate: props.fromDate,
				toDate: props.toDate,
			}
			const paramToString = toQueryString(param)
			http.get(`/api/app/statistics/payment/payment-method?${paramToString}`).then(res => {
				setChartDefaultOption()
				payPieChartRef.value.update()
				viewListDatas.value = []
				payPieChart.options.plugins.tooltip = true
				payPieChart.data.datasets[0].datalabels.labels.name.display = true

				if (res.length > 0) {
					payPieChart.data.labels = res.map(item => getEllipsis(item.methodName))
					payPieChart.data.datasets[0].backgroundColor = getFixedColors(payPieChart.data.labels.length)
					payPieChart.data.datasets[0].data = res.map(item => item.paymentAmount)
					payPieChart.data.datasets[0].tooltipData = res.map(item => {
						return { methodName: item.methodName, rate: item.rate }
					})

					if (payPieChart.data.labels.length > 5) {
						payPieChart.data.labels = payPieChart.data.labels.slice(0, 5)
						payPieChart.data.labels.push('기타')

						const etcPayAmount = payPieChart.data.datasets[0].data.reduce((a, b, i) => {
							return i >= 5 ? a + b : 0
						})
						payPieChart.data.datasets[0].data = payPieChart.data.datasets[0].data.slice(0, 5)
						payPieChart.data.datasets[0].data.push(etcPayAmount)

						const etcTooltipRate = payPieChart.data.datasets[0].tooltipData
							.map(item => item.rate)
							.reduce((a, b, i) => {
								return i >= 5 ? a + b : 0
							})
						payPieChart.data.datasets[0].tooltipData = payPieChart.data.datasets[0].tooltipData.slice(0, 5)
						payPieChart.data.datasets[0].tooltipData.push({
							methodName: '기타',
							rate: etcTooltipRate,
						})
					}

					nextTick(_ => {
						payPieChartRef.value.update()
						totalData.value = {
							paymentCount: res
								.map(o => o.paymentCount)
								.reduce((a, b) => {
									return a + b
								}),
							paymentAmount: res
								.map(o => o.paymentAmount)
								.reduce((a, b) => {
									return a + b
								}),
						}
						listDatas.value = res
						viewListDatas.value = listDatas.value.slice(0, 5)
					})
				}
			})
		}
		const event = {
			isMore: () => {
				viewListDatas.value = listDatas.value
				isMore.value = false
			},
		}

		watch(
			() => [props.fromDate, props.toDate],
			value => {
				getData()
			},
		)
		return {
			payPieChart,
			payPieChartRef,
			totalData,
			listDatas,
			viewListDatas,
			headerDatas,
			event,
			isMore,
			color,
		}
	},
}
</script>

<style scoped></style>
