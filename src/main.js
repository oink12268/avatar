import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Meta from 'vue-meta'

import './global/globalProperties'
import './global/constants/constants'

import plugins from '@/plugins'

const app = createApp(App)
app.use(router)
app.use(plugins)
app.use(Meta, {
	attribute: 'data-vue-meta',
	// vmid를 사용하기 위한 옵션
})
app.mount('#app')
