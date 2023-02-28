import { defineAsyncComponent } from 'vue'
import Page from '@/components/layouts/Page'

const ToggleButton = defineAsyncComponent(() =>
	import(/* webpackChunkName: "chunk-global-component" */ '@/components/common/ToggleButton'),
)
const scrollStickyContent = defineAsyncComponent(() =>
	import(/* webpackChunkName: "chunk-global-component" */ '@/components/layouts/ScrollStickyContent'),
)

export default {
	install: app => {
		if (app.install) return
		app.component('ToggleButton', ToggleButton)
		app.component('scrollStickyContent', scrollStickyContent)
		app.component('Page', Page)
	},
}
