<template>
	<page>
		<div class="home">
			<!--			<Header></Header>-->
			<component :is="menuInfo.componentName" info="menuCurTab" />
		</div>
		<Footer :service="service" />
	</page>
</template>

<script>
import menuComposable from '@/composables/menuComposable'
import { defineAsyncComponent, computed } from 'vue'
import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import Page from '@/components/layouts/Page'
const { menus, allMenuTabsList } = menuComposable()
const TransactionView = defineAsyncComponent(() =>
	import(/* webpackChunkName: "chunk-transaction" */ '@/views/transaction/TransactionView.vue'),
)
const BudgetView = defineAsyncComponent(() =>
	import(/* webpackChunkName: "chunk-statistics" */ '@/views/budget/BudgetView.vue'),
)
const StatisticsView = defineAsyncComponent(() =>
	import(/* webpackChunkName: "chunk-statistics" */ '@/views/statistics/StatisticsView.vue'),
)

export default {
	name: 'HomeView',
	components: {
		Page,
		Footer,
		Header,
		TransactionView,
		BudgetView,
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

<style scoped>
.content-height {
	height: calc(100% - 56px);
}
</style>
