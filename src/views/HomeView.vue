<template>
	<div class="home"><component :is="menuInfo.componentName" info="menuCurTab" /></div>
	<Footer :service="service" />
</template>

<script>
import menuComposable from '@/composables/menuComposable'
import { defineAsyncComponent, computed } from 'vue'
import Footer from '@/components/layouts/Footer'
const { menus, allMenuTabsList } = menuComposable()
const TransactionView = defineAsyncComponent(() =>
	import(/* webpackChunkName: "chunk-transaction" */ '@/views/transaction/TransactionView.vue'),
)
const StatisticsView = defineAsyncComponent(() =>
	import(/* webpackChunkName: "chunk-statistics" */ '@/views/statistics/StatisticsView.vue'),
)

export default {
	name: 'HomeView',
	components: {
		Footer,
		TransactionView,
		StatisticsView,
	},
	props: {
		service: {
			type: String,
			default: menus[0].service,
			validator: value => {
				return menus.map(menu => menu.service).indexOf(value) !== -1
			},
		},
		tab: {
			type: String,
			default: allMenuTabsList[0].path,
		},
	},
	setup(props) {
		const menuInfo = computed(() => {
			return menus.find(menu => menu.service === props.service)
		})

		const menuCurTab = computed(() => {
			return menuInfo.value.tabs.find(tab => tab.path === props.tab)
		})

		return {
			menuCurTab,
			menuInfo,
		}
	},
}
</script>

<style scoped></style>
