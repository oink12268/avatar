<template>
	<page>
		<back-header>검색</back-header>
		<div class="container ph-16">
			<div class="container mt-20 fs-15 fw-500 fc-medium-grey">메모</div>
			<div class="input-field-line-con value-check active">
				<input type="text" v-model="keyword" />
			</div>
			<div class="container dp-f align-items-center mt-10">
				<button class="button-rectangle size-100 large hp-54 mb-30" @click="event.search">검색</button>
			</div>

			<div
				v-for="(data, no) in datas"
				:key="no"
				class="dp-f container pv-12 pl-12 pr-8 align-items-center bdr-8 bd-light-grey mb-6"
			>
				<span class="fw-500 fc-medium-grey ellipsis" style="min-width: 40px">{{ data.date.substr(0, 10) }}</span>
				<span class="ml-40 fw-500 fc-medium-grey ellipsis" style="min-width: 40px">{{ data.memo }}</span>
				<span class="ml-at dp-if align-items-center flex-shrink-none fs-12 fc-red2">{{
					$filters.currency(data.amount)
				}}</span>
			</div>
		</div>
	</page>
</template>

<script>
import Page from '@/components/layouts/Page'
import BackHeader from '@/components/layouts/BackHeader'
import { provider } from '@/global/constants/constants'
import { toQueryString } from '@/global/utils'
import { inject, ref } from 'vue'

export default {
	name: 'SearchView',
	components: {
		Page,
		BackHeader,
	},
	setup() {
		const http = inject(provider.HTTP.VASELINE)
		const keyword = ref('')
		const datas = ref([])
		const event = {
			search: () => {
				const param = {
					keyword: keyword.value,
				}
				const paramToString = toQueryString(param)
				http.get(`/api/app/transaction/search?${paramToString}`).then(res => {
					datas.value = res
				})
			},
		}
		return {
			keyword,
			event,
			datas,
		}
	},
}
</script>

<style scoped></style>
