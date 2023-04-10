<template>
	<!--	<img class="wh-50" :src="$filters.getImagePath('plus_big.png')" @click="event.click" />-->
	<metainfo> </metainfo>
	<router-view></router-view>
</template>

<script>
// import axios from 'axios'
import { useMeta } from 'vue-meta'
import { inject } from 'vue'
import { provider } from '@/global/constants/constants'
import dayjs from 'dayjs'
export default {
	name: 'App',
	components: {},
	setup() {
		useMeta({
			title: 'TransactionModalMeta',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ vmid: 'description', name: 'description', content: 'description' },
				//vmid ↑ 메타 태그를 고유하게 만들어준다.
			],
		})
		const http = inject(provider.HTTP.VASELINE)
		const event = {
			click: () => {
				const param = {
					date: dayjs().format('YYYY-MM-DD'),
				}
				http.get(`/api/app/transaction`, param).then(res => {
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
