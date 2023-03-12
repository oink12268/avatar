<template>
	<div class="calendar-wrap">
		<div class="calendar-controller">
			<button
				class="calendar-today ps-a left-50 button-outline small bd-light-grey fc-dark-grey ta-c hp-23"
				@click="focusToday"
			>
				오늘
			</button>
			<date-range :mode="dateType.MONTH" :to-date="today" @selectedDate="getCalendarData" />
		</div>

		<div class="calendar-box">
			<div class="calendar-week-title">
				<div class="calendar-cell" :class="{ 'fc-red': no === 0 }" v-for="(weekday, no) in weekDays" :key="no">
					{{ weekday }}
				</div>
			</div>

			<div class="calendar-week" v-for="(date, idx) in dates" :key="idx">
				<div
					class="calendar-cell"
					v-for="(day, no) in date"
					:key="no"
					:class="{
						'fc-red': no === 0,
						'fc-blue': no === 6,
						disabled:
							(idx === 0 && day.day >= lastMonthStart) || (idx === dates.length - 1 && day.day < firstDayOfTheLastWeek),
						active:
							day.day === selectedDate.get('D') &&
							!(
								(idx === 0 && day.day >= lastMonthStart) ||
								(idx === dates.length - 1 && day.day < firstDayOfTheLastWeek)
							),
					}"
				>
					<div class="container ph-4" @click="selectDate(idx, day.day)">
						<div class="fs-10 ta-l">
							{{ day.day }}
						</div>

						<div class="calendar-price">{{ day.thisMonth === true ? $filters.currency(day.incomeAmount) : ' ' }}</div>
						<div class="calendar-price">{{ day.thisMonth === true ? $filters.currency(day.paymentAmount) : ' ' }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import DateRange from '@/views/transaction/DateRange'
import { dayOfWeek, dateType, provider } from '@/global/constants/constants'
import { inject, ref, watch, nextTick } from 'vue'
import dayjs from 'dayjs'

export default {
	name: 'Calendar',
	components: { DateRange },
	props: {
		refresh: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['selected-date'],
	setup(props, { emit }) {
		const http = inject(provider.HTTP.VASELINE)
		const selectedDate = ref(dayjs())
		const today = ref(dayjs().format('YYYY-MM-DD'))
		const weekDays = ref(dayOfWeek)
		const dates = ref([])
		const datas = ref([])
		const lastMonthStart = ref(0)
		const prevDay = ref(0)
		const firstDayOfTheLastWeek = ref(0)
		const toDate = ref('')

		const focusToday = () => {
			selectedDate.value = dayjs()
			today.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
		}

		const getCalendarData = (refresh = false, toDate) => {
			selectedDate.value = selectedDate.value.set('M', dayjs(toDate).get('M'))
			http.get(`/api/app/transaction/total/${selectedDate.value.format('YYYY-MM')}`).then(res => {
				datas.value = res
				nextTick(_ => {
					changeMonth(toDate)
				})
			})
		}

		const selectDate = (idx, day) => {
			if (
				(idx === 0 && day >= lastMonthStart.value) ||
				(idx === dates.value.length - 1 && day < firstDayOfTheLastWeek.value)
			)
				return
			selectedDate.value = selectedDate.value.set('D', day)
		}

		const changeMonth = toDate => {
			let day = 1
			let weekOfDays = []
			dates.value = []
			const daysInMonth = dayjs(toDate).daysInMonth()
			let monthFirstDay = dayjs(toDate).set('D', 1).day()
			lastMonthStart.value = prevDay.value = dayjs(toDate).subtract(1, 'month').daysInMonth() - monthFirstDay + 1
			while (day <= daysInMonth) {
				if (day === 1) {
					for (let i = 0; i < monthFirstDay; i++) {
						weekOfDays.push({
							day: prevDay.value,
							thisMonth: false,
						})
						prevDay.value += 1
					}
				}
				weekOfDays.push({
					day: day,
					incomeAmount: datas.value.length >= day ? datas.value[day - 1].incomeAmount : 0,
					paymentAmount: datas.value.length >= day ? datas.value[day - 1].paymentAmount : 0,
					thisMonth: true,
				})

				if (weekOfDays.length === 7) {
					dates.value.push(weekOfDays)
					if (day === daysInMonth) firstDayOfTheLastWeek.value = weekOfDays[0].day
					weekOfDays = []
				}
				day++
				if (day > daysInMonth && weekOfDays.length != 0) {
					firstDayOfTheLastWeek.value = weekOfDays[0].day
					const leftDays = 7 - weekOfDays.length
					for (let i = 1; i <= leftDays; i++) {
						weekOfDays.push({
							day: i,
							thisMonth: false,
						})
					}
					dates.value.push(weekOfDays)
				}
			}
		}

		watch(
			() => selectedDate.value,
			_ => {
				emit('selected-date', selectedDate.value)
			},
		)
		watch(
			() => props.refresh,
			_ => {
				getCalendarData(true, selectedDate.value)
			},
		)
		return {
			dateType,
			today,
			selectedDate,
			weekDays,
			dates,
			datas,
			changeMonth,
			lastMonthStart,
			firstDayOfTheLastWeek,
			prevDay,
			getCalendarData,
			selectDate,
			focusToday,
		}
	},
}
</script>

<style scoped>
.calendar-cell.active > div {
	background-color: #c9d0de;
	color: #fff;
}
.calendar-today {
	z-index: 2;
	font-size: 14px;
}
</style>
