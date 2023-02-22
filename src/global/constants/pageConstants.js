const menu = Object.freeze({
	MENU_LIST: [
		{
			componentName: 'TransactionView',
			title: '수출입관리',
			service: 'transaction',
			tabs: [{ code: 'CALENDAR', title: '달력', path: 'calendar' }],
		},
		{
			componentName: 'StatisticsView',
			title: '통계관리',
			service: 'statistics',
			tabs: [{ code: 'statistics', title: '통계', path: 'statistics' }],
		},
	],
})

export { menu }
