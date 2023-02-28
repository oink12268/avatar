const provider = Object.freeze({
	HTTP: {
		VASELINE: 'vaselineApi',
	},
	FILTERS: 'filters',
})
const sns = Object.freeze({
	GOOGLE: 'google',
	NAVER: 'naver',
	KAKAO: 'kakao',
})

const dateType = Object.freeze({
	DAY: 'DAY',
	WEEK: 'WEEK',
	MONTH: 'MONTH',
	YEAR: 'YEAR',
})

const displayText = Object.freeze({
	DASH: '-',
	MASKING: '****',
})

const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토']

export { provider, sns, dateType, displayText, dayOfWeek }
