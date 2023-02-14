<template>
	<!--    <img alt="Vue logo" src="./assets/logo.png" @click="event.click">-->
	<router-view></router-view>
</template>

<script>
import axios from 'axios'
export default {
	name: 'App',

	components: {},
	setup() {
		const event = {
			click: () => {
				const param = {
					categoryName: 'food',
					amount: 21000,
					memo: '주간재료',
				}
				axios.post('/api/admin/payment', param).then(res => {
					console.log('KSH::Court', res.data)
				})
				// axios.get('/api/my-rythm').then((res) => {
				//   console.log('KSH::Court', res.data)
				// })
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
