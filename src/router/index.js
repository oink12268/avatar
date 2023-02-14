import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import DashboardView from '@/views/DashboardView'

const routes = [
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
	routes,
})

export default router
