import { defineAsyncComponent } from 'vue'

const ToggleButton = defineAsyncComponent(() =>
	import(/* webpackChunkName: "chunk-global-component" */ '@/components/common/ToggleButton'),
)

export default {
	install: app => {
		if (app.install) return
		app.component('ToggleButton', ToggleButton)
	},
}
