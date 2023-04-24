import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './global/globalProperties'
import './global/constants/constants'

import plugins from '@/plugins'

const app = createApp(App)
app.use(router)
app.use(plugins)
app.mount('#app')
