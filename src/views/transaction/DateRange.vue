<template>
	<div class="flex-center container pv-12">
		<button v-if="isChange" class="ic24_arrow_l_bold ic_medium-grey" @click="event.click.dateChange('before')"></button>
		<div class="ph-6 fs-18 fw-500">{{ dateByMode }}</div>
		<button
			v-if="isChange"
			class="ic24_arrow_r_bold"
			:class="isAfter ? 'ic_medium-grey' : 'ic_grey2'"
			@click="event.click.dateChange('after')"
		></button>
	</div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { dateType } from '@/global/constants/constants'
import { dateFormat, dateNowToString, dateCompare } from '@/global/utils'
import dayjs from 'dayjs'

export default {
	name: 'DateRange',
	props: {
		mode: {
			type: String,
			default: dateType.DAY,
			validator: value => {
				return [dateType.DAY, dateType.WEEK, dateType.MONTH].indexOf(value) !== -1
			},
		},
		fromDate: {
			type: String,
			default: '',
		},
		toDate: {
			type: String,
			default: dateNowToString('YYYY-MM-DD'),
		},
		isChange: {
			type: Boolean,
			default: true,
		},
	},
	emits: ['selected-date'],
	setup(props, { emit }) {
		const dateByMode = ref('')
		const currentDate = dateNowToString('YYYY-MM-DD')
		const settingDate = ref('')

		const getSettingDate = () => {
			const isBeforeDate = dateCompare(props.toDate, currentDate)
			switch (props.mode) {
				case dateType.DAY:
				case dateType.MONTH:
					settingDate.value = isBeforeDate ? props.toDate : currentDate
					break
				case dateType.WEEK:
					settingDate.value = dayjs(isBeforeDate ? props.toDate : currentDate)
						.subtract(props.toDate.length <= 0 ? 1 : 0, dateType.DAY)
						.format('YYYY-MM-DD')
					break
			}
		}

		const getDateByMode = settingDate => {
			if (props.mode === dateType.WEEK) {
				if (props.fromDate) {
					dateByMode.value = `${dateFormat(props.fromDate, 'YYYY.MM.DD')} ~ ${dateFormat(props.toDate, 'YYYY.MM.DD')}`
				} else {
					const fromDate = dayjs(settingDate).subtract(6, dateType.DAY).format('YYYY-MM-DD')
					emit('selected-date', fromDate, settingDate)
					dateByMode.value = `${dateFormat(fromDate, 'YYYY.MM.DD')} ~ ${dateFormat(settingDate, 'YYYY.MM.DD')}`
				}
			} else {
				emit('selected-date', null, dateFormat(settingDate, props.mode != dateType.MONTH ? 'YYYY-MM-DD' : 'YYYY-MM'))
				dateByMode.value = dateFormat(settingDate, props.mode != dateType.MONTH ? 'YYYY.MM.DD' : 'YYYY.MM')
			}
		}

		onMounted(_ => {
			getSettingDate()
			getDateByMode(settingDate.value)
		})

		const event = {
			click: {
				dateChange: type => {
					if (type === 'after' && !isAfter.value) return
					settingDate.value = dayjs(settingDate.value)
						.add(type === 'before' ? -1 : 1, props.mode)
						.format('YYYY-MM-DD')
					getDateByMode(settingDate.value)
				},
			},
		}

		const isAfter = computed(() => {
			let flag = true
			const compareDate = dayjs(settingDate.value).format('YYYY-MM-DD')
			const weekCompareDate = dayjs(settingDate.value).add(7, dateType.DAY).format('YYYY-MM-DD')

			switch (props.mode) {
				case dateType.DAY:
					flag = dateCompare(compareDate, currentDate)
					break
				case dateType.WEEK:
					flag =
						props.toDate === currentDate
							? dateCompare(compareDate, dayjs(currentDate).subtract(1, dateType.DAY).format('YYYY-MM-DD'))
							: dateCompare(weekCompareDate, currentDate)
					break
				case dateType.MONTH:
					flag = dateCompare(dateFormat(compareDate, 'YYYY-MM'), dateFormat(currentDate, 'YYYY-MM'))
					break
			}

			return flag
		})

		watch(
			() => [props.mode, props.toDate],
			value => {
				getSettingDate()
				getDateByMode(settingDate.value)
			},
		)

		return {
			dateByMode,
			isAfter,
			event,
		}
	},
}
</script>

<style scoped></style>
