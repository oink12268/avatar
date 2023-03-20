import { createApp, h } from 'vue'
import Alert from '@/components/popup/Alert'
import Loading from '@/components/popup/Loading'
import { provider } from '@/global/constants/constants'

const injectComponent = (comp, props) => {
	const div = document.createElement('div')
	const vm = createApp(comp, props)
	return vm.mount(div)
}

const alertComponentInject = (globalOptions = {}, type) => {
	return {
		open(message, title, options = {}) {
			const localOptions = { message, type, ...options }
			const instance = injectComponent(Alert, { ...globalOptions, ...localOptions })
			return instance.open()
		},
	}
}

const loadingComponentInject = (app, emitter) => {
	const div = document.createElement('div')
	const vm = createApp(Loading)
	vm.provide(provider.EVENT_BUS, emitter)

	return {
		open: vm.mount(div),
	}
}

export default {
	install: (app, options, emitter) => {
		app.config.globalProperties.$alert = alertComponentInject(options, 'alert').open
		app.config.globalProperties.$confirm = alertComponentInject(options, 'confirm').open
		app.config.globalProperties.$loading = loadingComponentInject(app, emitter).open
	},
}
