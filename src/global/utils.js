import dayjs from 'dayjs'
import { displayText } from '@/global/constants/constants'

const dateFormat = (value, format = 'YYYY-MM-DD') => {
	if (!value) return displayText.DASH
	const dt = value.replace('T', '').replace(/\./g, '-')
	return format ? dayjs(dt).format(format) : dayjs(dt)
}

const dateNowToString = (format = 'YYYY-MM-DD') => {
	dayjs.locale('ko')
	const now = dayjs()
	return now.format(format)
}

const dateCompare = (date1, date2) => {
	if (!date1 || !date2) return null
	const dt1 = date1.replace('T', '').replace(/\./g, '-')
	const dt2 = date2.replace('T', '').replace(/\./g, '-')
	return dayjs(dt1).isBefore(dayjs(dt2)) // now().isBefore('2022-06-21')
}

const getImagePath = imageName => {
	return require(`@/assets/images/${imageName}`)
}

const currency = value => {
	if (!value && value !== 0) return displayText.DASH
	const parts = value.toString().split('.')
	return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '')
}

const toQueryString = payload => {
	return Object.entries(payload)
		.filter(([, value]) => !(value === undefined || (typeof value !== 'boolean' && !value) || value.length === 0))
		.map(obj => obj.join('='))
		.join('&')
}

export { dateFormat, dateNowToString, dateCompare, getImagePath, currency, toQueryString }
