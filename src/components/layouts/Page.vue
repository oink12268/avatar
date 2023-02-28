<template>
	<div class="page router-view-c">
		<slot />
	</div>
</template>

<script>
import { nextTick, onActivated, onDeactivated, ref, onUnmounted } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

export default {
	name: 'Page',
	props: {
		isTabletSize: {
			type: Boolean,
			default: true,
		},
	},
	setup(_, { slots }) {
		const scrollY = ref([])

		onBeforeRouteLeave((to, from, next) => {
			console.log('onBeforeRouteLeave')
			const scrollContents = document.querySelectorAll('.content-scroll')
			scrollContents.forEach(item => {
				scrollY.value.push(item.scrollTop)
			})
			next()
		})

		onBeforeRouteUpdate(() => {
			console.log('onBeforeRouteUpdate')
			const scrollContents = document.querySelectorAll('.content-scroll')
			scrollContents.forEach(item => {
				scrollY.value.push(item.scrollTop)
			})
		})

		onActivated(() => {
			console.log('activate')
			nextTick(() => {
				const scrollContents = document.querySelectorAll('.content-scroll')
				scrollContents.forEach((item, no) => {
					item.scrollTop = scrollY.value[no]
				})

				scrollY.value.length = 0
			})
		})

		onDeactivated(() => {
			console.log('deactivate')
		})

		onUnmounted(() => {
			console.log('unmounted')
		})

		return {
			slots,
			onUnmounted,
		}
	},
}
</script>

<style scoped>
.page {
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
}
</style>
