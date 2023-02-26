import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/login/LoginView.vue'
import DashboardView from '@/views/transaction/TransactionView'
import { homeModules } from '@/router/home'

const routers = [
	{
		path: '/login',
		name: 'Login',
		component: LoginView,
	},
	{
		path: '/dashboard',
		name: 'DashboardView',
		component: DashboardView,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes: [...routers, ...homeModules],
})

export default router
