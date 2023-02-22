export const homeModules = [
	{
		path: '/home/:service?/:tab?',
		component: () => import(/* webpackChunkName: "chunk-home" */ '@/views/HomeView.vue'),
		props: route => ({ ...route.query, ...route.params }),
	},
]
