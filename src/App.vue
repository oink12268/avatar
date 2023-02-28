<template>
	<!--	<img class="wh-50" :src="$filters.getImagePath('plus_big.png')" @click="event.click" />-->
	<router-view></router-view>
</template>

<script>
// import axios from 'axios'
import { inject } from 'vue'
import { provider } from '@/global/constants/constants'
import dayjs from 'dayjs'
export default {
	name: 'App',

	components: {},
	setup() {
		const http = inject(provider.HTTP.VASELINE)
		const event = {
			click: () => {
				// const param = {
				// 	categoryName: 'food',
				// 	amount: 21000,
				// 	memo: '주간재료',
				// }
				// // axios.post('/api/admin/payment', param).then(res => {
				// // 	console.log('KSH::Court', res.data)
				// // })
				// axios.get('/api/my-rythm').then(res => {
				// 	console.log('KSH::Court', res.data)
				// })

				const param = {
					date: dayjs().format('YYYY-MM-DD'),
				}
				http.get('/api/app/transaction', param).then(res => {
					console.log('res', res)
				})
			},
		}

		return {
			event,
		}
	},
}
</script>
<style lang="scss">
@import '~@/assets/scss/_global.scss';
</style>
