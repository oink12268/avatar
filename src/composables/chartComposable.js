import { color } from '@/global/constants/colorConstants'

export default function chartComposable() {
	const event = {
		onClick: (e, item, context) => {
			context.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
				colors[index] = color.length === 9 ? color.slice(0, -2) : color
			})
			if (item.length > 0) {
				context.data.datasets[0].backgroundColor.forEach((color, index, colors) => {
					colors[index] = index === item[0].index || color.length === 9 ? color : color + '4D'
				})
			}
			context.update()
		},
	}

	const lineChart = {
		type: 'line',
		data: {
			labels: [],
			datasets: [
				{
					label: null,
					tension: 0,
					backgroundColor: null,
					borderColor: null,
					data: [],
				},
			],
		},
		options: {
			responsive: true,
			plugins: {
				tooltip: {
					titleFont: {
						size: 13,
						weight: 'bold',
					},
					titleAlign: 'center',
					bodyAlign: 'center',
					bodyFont: {
						weight: 'bold',
					},
					padding: 12,
					cornerRadius: 15,
					bodySpacing: 4,
					callbacks: {
						title: null,
						label: null,
						afterLabel: null,
					},
				},
				legend: {
					position: 'bottom',
					align: 'center',
					labels: {
						boxWidth: 13,
					},
				},
			},
			interaction: {
				mode: 'index',
				intersect: false,
			},
			scales: {
				x: null,
				y: null,
			},
			aspectRatio: 1.1,
		},
	}

	const halfDoughnutChart = {
		type: 'doughnut',
		data: {
			labels: [],
			datasets: [
				{
					backgroundColor: [],
					data: [],
					datalabels: {
						labels: {
							name: {
								display: true,
								anchor: 'end',
								align: 'top',
								borderColor: 'white',
								borderWidth: 1,
								borderRadius: 4,
								color: 'white',
								font: { size: 10, weight: 'bold' },
								backgroundColor: context => {
									return context.dataset.backgroundColor
								},
								formatter: (value, context) => {
									if (context.dataset.tooltipData != undefined) {
										return `${context.dataset.tooltipData[context.dataIndex].salesAmount}\n(${
											context.dataset.tooltipData[context.dataIndex].rate
										}%)`
									}
								},
								padding: 6,
							},
							value: {
								display: false,
							},
						},
					},
				},
			],
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'bottom',
					align: 'center',
					labels: {
						boxWidth: 13,
						generateLabels: function (chart) {
							return chart.data.labels.map((label, index) => ({
								text: label === '배달' || (label === '그 외' && index === 3) ? label + ' >' : label,
								fontColor: label === '배달' || (label === '그 외' && index === 3) ? '#146EE6' : '#232836',
								fillStyle: chart.data.datasets[0].backgroundColor[index],
								strokeStyle: '#ffffff',
							}))
						},
					},
				},
			},
			borderColor: 'white',
			borderWidth: 0.5,
			borderRadius: 3,
			aspectRatio: 1.1,
			cutoutPercentage: 30,
			layout: {
				padding: 20,
			},
			rotation: 270,
			circumference: 180,
			onClick: (e, item, context) => {
				event.onClick(e, item, context)
			},
		},
	}

	const pieChart = {
		type: 'pie',
		data: {
			labels: [],
			datasets: [
				{
					backgroundColor: [],
					data: [],
					datalabels: {
						labels: {
							name: {
								display: true,
								anchor: 'end',
								align: 'top',
								borderColor: 'white',
								borderWidth: 1,
								borderRadius: 4,
								color: 'white',
								font: { size: 10, weight: 'bold' },
								backgroundColor: context => {
									return context.dataset.backgroundColor
								},
								formatter: (value, context) => {
									if (context.dataset.tooltipData != undefined) {
										return `${context.dataset.tooltipData[context.dataIndex].methodName}\n(${
											context.dataset.tooltipData[context.dataIndex].rate
										}%)`
									}
								},
								padding: 6,
							},
							value: {
								display: false,
							},
						},
					},
				},
			],
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'bottom',
					align: 'center',
					labels: {
						boxWidth: 13,
					},
				},
			},
			borderColor: 'white',
			borderWidth: 0,
			borderRadius: 0,
			aspectRatio: 1,
			cutoutPercentage: 30,
			layout: {
				padding: 50,
			},
			onClick: (e, item, context) => {
				event.onClick(e, item, context)
			},
		},
	}

	const verticalBarChart = {
		type: 'bar',
		data: {
			labels: [],
			datasets: [
				{
					backgroundColor: [],
					data: [],
				},
			],
		},
		options: {
			responsive: true,
			plugins: {
				tooltip: {
					titleFont: {
						size: 13,
						weight: 'bold',
					},
					titleAlign: 'center',
					bodyAlign: 'center',
					bodyFont: {
						weight: 'bold',
					},
					padding: 12,
					cornerRadius: 15,
					bodySpacing: 4,
					callbacks: {
						title: null,
						label: null,
						afterLabel: null,
					},
				},
				legend: {
					display: false,
				},
			},
			interaction: {
				mode: 'index',
				intersect: false,
			},
			scales: {
				x: null,
				y: null,
			},
			onClick: (e, item, context) => {
				// event.onClick(e, item, context)
			},
		},
	}

	const stackedBarChart = {
		type: 'bar',
		data: {
			labels: [],
			datasets: [
				{
					label: '',
					backgroundColor: [],
					data: [],
					tooltipData: [],
				},
			],
		},
		options: {
			responsive: true,
			plugins: {
				tooltip: {
					titleFont: {
						size: 13,
						weight: 'bold',
					},
					titleAlign: 'center',
					bodyAlign: 'center',
					bodyFont: {
						weight: 'bold',
					},
					padding: 12,
					cornerRadius: 15,
					bodySpacing: 4,
					callbacks: {
						title: null,
						label: null,
						afterLabel: null,
					},
				},
				legend: {
					position: 'bottom',
					align: 'center',
					labels: {
						boxWidth: 13,
					},
				},
			},
			interaction: {
				mode: 'index',
				intersect: false,
			},
			scales: {
				x: null,
				y: null,
			},
		},
	}

	const getOrCreateTooltip = chart => {
		let tooltipEl = chart.canvas.parentNode.querySelector('div')

		if (!tooltipEl) {
			tooltipEl = document.createElement('div')
			tooltipEl.style.background = 'rgba(0, 0, 0, 0.83)'
			tooltipEl.style.borderRadius = '15px'
			tooltipEl.style.color = 'white'
			tooltipEl.style.opacity = 1
			tooltipEl.style.display = 'block'
			tooltipEl.style.position = 'absolute'
			tooltipEl.style.transform = 'translate(-50%, 0)'
			tooltipEl.style.transition = 'all .1s ease'

			const table = document.createElement('table')
			table.style.margin = '0px'

			tooltipEl.appendChild(table)
			chart.canvas.parentNode.appendChild(tooltipEl)
		}

		return tooltipEl
	}

	const getFixedColors = length => {
		const fixedColors = color.COLOR_LIST.FIXED_COLOR
		const lastColor = fixedColors[fixedColors.length - 1]
		if (fixedColors.length < length) {
			const resultColors = fixedColors
			const extraLength = length - fixedColors.length
			for (let i = 0; i <= extraLength; i++) {
				resultColors.push(lastColor)
			}
			return resultColors
		}
		return fixedColors.slice(0, length)
	}

	return {
		color,
		lineChart,
		halfDoughnutChart,
		pieChart,
		verticalBarChart,
		stackedBarChart,
		getOrCreateTooltip,
		getFixedColors,
	}
}
