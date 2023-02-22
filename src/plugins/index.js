import { provider } from '@/global/constants/constants'
import filters from '@/global/filters'

export default {
	install: (app, options) => {
		app.provide(provider.FILTERS, filters)
		app.config.globalProperties.$filters = filters
	},
}
