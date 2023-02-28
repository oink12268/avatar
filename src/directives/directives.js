import { throttle, debounce } from '@/global/utils'

const observerScrollPaging = {
	beforeMount: (el, binding, vnode) => {
		const options = {
			root: null,
			rootMargin: '0px',
			threshold: 1,
		}
		const callback = binding.value
		const offset = binding.instance.offset
		const limit = el.getAttribute('observer-limit')
		const key = el.getAttribute('observer-key')

		const observer = new IntersectionObserver(async ([entry], observer) => {
			if (entry.isIntersecting) {
				const item = entry.target
				observer.unobserve(item)

				if (Number(limit) * offset === Number(key) + 1) {
					await callback()
				}
			}
		}, options)

		observer.observe(el)
	},
}

const scrollElementSticky = {
	beforeMount: (el, binding) => {
		const callback = binding.value
		const stickyMode = el.getAttribute('mode')

		callback(false, el)

		if (stickyMode === 'topZero') {
			console.log('스크롤 top 0 일때')
			el.stickyHandler = () => {
				let currentScroll = el.scrollTop
				if (currentScroll > 0) {
					callback(true, el)
					return
				}
				callback(false, el)
			}
			el.addEventListener('scroll', el.stickyHandler)
			return
		}

		if (stickyMode === 'upDown') {
			console.log('스크롤 업다운으로 체크해야할때')
			let previousScroll = 0
			el.stickyHandler = () => {
				let currentScroll = el.scrollTop

				if (el.clientHeight + 54 >= el.scrollHeight) {
					callback(false, el)
					return
				}
				if (currentScroll > previousScroll) {
					// scroll down
					callback(true, el)
				} else {
					// scroll up
					callback(false, el)
				}
				previousScroll = currentScroll
			}
			el.addEventListener('scroll', throttle(el.stickyHandler, 30))
		}
	},
	beforeUnmount: el => {
		console.log('beforeUnmount scrollElementSticky')
		el.removeEventListener('scroll', el.stickyHandler)
		el.removeEventListener('scroll', throttle(el.stickyHandler, 30))
	},
}
export { observerScrollPaging, scrollElementSticky }
