<template>
	<div class="container content-scroll" ref="scrollRef" v-scroll-sticky="scrollSticky" :mode="mode">
		<slot name="content" />
	</div>
</template>

<script>
import { ref, nextTick } from 'vue'
import { scrollElementSticky } from '@/directives/directives'
// import { native } from '@/plugins/nativeBridge'

export default {
	name: 'ScrollStickyContent',
	directives: {
		scrollSticky: scrollElementSticky,
	},
	props: {
		mode: {
			type: String,
			default: 'topZero',
			validator: value => {
				return ['topZero', 'upDown'].indexOf(value) !== -1
			},
		},
	},
	setup(props, { emit, expose }) {
		const scrollRef = ref(null)
		// const osType = native.getOsType()
		// const isIos = osType.indexOf('ios') >= 0

		const scrollSticky = (isSticky, element) => {
			// console.log(isSticky, element.scrollTop)

			// if (!isIos) {
			// 	// ios 높이 조절을 하니 스크롤이 매끄럽지가 않음
			// 	emit('scroll-sticky', isSticky)
			// }

			if (props.stickyStart === 0 || element.previousElementSibling === null) return
			let target = element.previousElementSibling

			if (!target.className.includes('title-bar')) {
				const children = element.parentNode.children
				for (const child of children) {
					if (child.className.includes('title-bar')) {
						target = child
						break
					}
				}
			}

			if (isSticky) target.classList.add('sticky')
			else target.classList.remove('sticky')
		}

		const scrollTop = () => {
			nextTick(_ => {
				scrollRef.value.scrollTo({ top: 0, behavior: 'auto' })
			})
		}

		expose({ scrollTop })

		return {
			scrollRef,
			scrollSticky,
		}
	},
}
</script>

<style scoped>
.shadow {
	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
	background-color: #fff;
}
</style>
