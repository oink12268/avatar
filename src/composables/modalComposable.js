import { ref, getCurrentInstance } from 'vue'

export default function modalComposable() {
	const isShow = ref(false)
	const { emit } = getCurrentInstance()

	const showModal = (isBack = true) => {
		if (isBack) {
			history.pushState('modal', null, '')
		}
		window.addEventListener('popstate', goBack)
		isShow.value = true
	}

	const hideModal = (isBack = true) => {
		window.removeEventListener('popstate', goBack)
		if (history.state === 'modal') {
			history.back()
		}
		// emit('close')
		isShow.value = false
	}

	const goBack = () => {
		hideModal()
	}

	return {
		isShow,
		showModal,
		hideModal,
	}
}
