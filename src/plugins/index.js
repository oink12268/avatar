import mitt from 'mitt'
import { provider } from '@/global/constants/constants'
import filters from '@/global/filters'
import globalComponent from '@/plugins/globalComponent'
import { vaselineHttpClient } from '@/api/vaselineHttp'
import DynamicGlobalComponent from '@/plugins/dynamicGlobalComponent'

export default {
	install: (app, options) => {
		app.provide(provider.FILTERS, filters)
		app.config.globalProperties.$filters = filters
		globalComponent.install(app, options)

		const vaselineHttp = vaselineHttpClient()
		app.provide(provider.HTTP.VASELINE, vaselineHttp)

		const emitter = mitt()
		DynamicGlobalComponent.install(app, options, emitter)
	},
}
