import { getCurrentInstance } from 'vue'
export default function globalComposable() {
	const instance = getCurrentInstance()
	const alert = msg => {
		return instance.appContext.config.globalProperties.$alert(msg)
	}
	const confirm = msg => {
		return instance.appContext.config.globalProperties.$confirm(msg)
	}
	const toast = (msg, option) => {
		let message = '<div class="container ta-c">' + msg + '</div>'
		return instance.appContext.config.globalProperties.$toast('', { slotRight: message, ...option })
	}
	const loading = {
		on: (msg, option) => {
			return instance.appContext.config.globalProperties.$loading.on(msg, option)
		},
		off: () => {
			return instance.appContext.config.globalProperties.$loading.off()
		},
	}
	return {
		alert,
		confirm,
		toast,
		loading,
	}
}
