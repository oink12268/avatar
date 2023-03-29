const provider = Object.freeze({
	EVENT_BUS: 'eventBus',
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

const loadingType = Object.freeze({
	DOT: 'dot',
	RECEIPT_PRINT: 'receiptPrint',
})

const transaction = Object.freeze({
	TRANSACTION_TYPE: [
		{ code: 0, title: '현금' },
		{ code: 1, title: '페이' },
		{ code: 2, title: '카드' },
	],
})

const statistics = Object.freeze({
	STATISTICS_REPORT_TYPE: [
		{ code: 0, title: '월간' },
		{ code: 1, title: '연간' },
	],
})
const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토']

export { provider, sns, dateType, displayText, dayOfWeek, loadingType, transaction, statistics }
