<template>
	<scroll-sticky-content class="scroll-56 bd-light-grey-t01">
		<template #content>
			<div class="container ph-16">
				<calendar @selectedDate="event.change" :refresh="refresh" />
				<div class="container dp-f align-items-center mb-20">
					<button class="button-rectangle size-50 large hp-54" @click="event.open(false)">수입</button>
					<button class="button-rectangle size-50 large hp-54" @click="event.open(true)">지출</button>
				</div>
				<div
					v-for="(income, no) in datas.incomes"
					:key="no"
					class="dp-f container pv-12 pl-12 pr-8 align-items-center bdr-8 bd-light-grey mb-12"
					@click="event.delete(false, income.idx)"
				>
					<span class="fw-500 fc-medium-grey ellipsis" style="min-width: 40px">{{ income.memo }}</span>
					<button class="ml-at dp-if align-items-center flex-shrink-none">
						<span class="fs-12 fc-green2">{{ $filters.currency(income.amount) }}</span>
					</button>
				</div>

				<div
					v-for="(payment, no) in datas.payments"
					:key="no"
					class="dp-f container pv-12 pl-12 pr-8 align-items-center bdr-8 bd-light-grey mb-12"
					@click="event.delete(true, payment.idx)"
				>
					<span class="fw-500 fc-medium-grey ellipsis" style="min-width: 40px">{{ payment.memo }}</span>
					<button class="ml-at dp-if align-items-center flex-shrink-none">
						<span class="fs-12 fc-red2">{{ $filters.currency(payment.amount) }}</span>
					</button>
				</div>

				<transaction-modal
					:is-open="isOpen"
					:is-payment="isPayment"
					:selected-date="selectedDate"
					@close="event.close"
				/>
			</div>
		</template>
	</scroll-sticky-content>
</template>

<script>
import { inject, ref } from 'vue'
import Calendar from '@/views/transaction/Calendar'
import TransactionModal from '@/views/transaction/TransactionModal'
import dayjs from 'dayjs'
import { provider } from '@/global/constants/constants'
import globalComposable from '@/composables/globalComposable'

export default {
	name: 'TransactionView',
	components: { TransactionModal, Calendar },
	setup() {
		const http = inject(provider.HTTP.VASELINE)
		const selectedDate = ref(dayjs().format('YYYY-MM-DD'))
		const isPayment = ref(false)
		const isOpen = ref(false)
		const datas = ref({
			payments: [],
			incomes: [],
		})
		const refresh = ref(false)
		const { confirm } = globalComposable()

		const event = {
			change: date => {
				selectedDate.value = date.format('YYYY-MM-DD')
				getTransaction()
			},
			delete: (isPay, idx) => {
				confirm('삭제 하시겠습니까?').then(res => {
					if (res) {
						http.delete(`/api/app/${isPay ? 'payment' : 'income'}/${idx}`).then(res => {
							getTransaction()
							refresh.value = !refresh.value
						})
					}
				})
			},
			open: isPay => {
				isPayment.value = isPay
				isOpen.value = true
			},
			close: isChange => {
				isOpen.value = false
				refresh.value = !refresh.value
			},
		}

		const getTransaction = () => {
			http.get(`/api/app/transaction/${selectedDate.value}`).then(res => {
				datas.value.payments = res.paymentVos
				datas.value.incomes = res.incomeVos
			})
		}
		getTransaction()

		return {
			selectedDate,
			isPayment,
			isOpen,
			event,
			datas,
			refresh,
		}
	},
}
</script>

<style scoped>
.sales-lab-banner {
	width: 100vw;
}
.fc-green2 {
	color: #c0d4ad !important;
}

.fc-red2 {
	color: #e2a9a5 !important;
}
</style>
