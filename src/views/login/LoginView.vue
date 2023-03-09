<template>
	<div class="container ph-16">
		<h1 class="display-1">Login</h1>
		<div class="dp-f center">
			<!--			<img class="wd-150 hp-40" src="src/assets/images/btn_google_signin_dark_focus_web.png" @click="event.click" />-->
			<img
				class="wd-150 hp-40"
				:src="$filters.getImagePath('btn_google_signin_dark_focus_web.png')"
				@click="event.click"
			/>
			<img class="wd-150 hp-40" :src="$filters.getImagePath('kakao_login_medium_narrow.png')" @click="event.click2" />
			<img class="wd-150 hp-40" :src="$filters.getImagePath('naver_login.png')" @click="event.click3" />
			<!--			<img class="wd-150 hp-40" src="../assets/naver_login.png" @click="event.click4" />-->
			<button @click="event.click5">로그아웃</button>
		</div>
	</div>

	<button class="button-rectangle size-100 bg-primary hp-54" @click="event.click5">modal test</button>

	<bottom-modal :is-open="toggle" @close="toggle = !toggle">
		<div class="fs-16 ta-c fw-900 pb-16">배달요청</div>
		<div class="container pv-12 fs-12 fw-500 fc-medium-grey">금액</div>
		<div class="input-field-line-con value-check active">
			<input type="number" placeholder="10,000" value="" />
		</div>

		<div class="container pv-12 fs-12 fw-500 fc-medium-grey">메모</div>
		<div class="input-field-line-con value-check active">
			<input type="text" value="" />
		</div>
	</bottom-modal>
</template>

<script>
import BottomModal from '@/components/popup/BottomModal'
import { ref, inject } from 'vue'
import { provider } from '@/global/constants/constants'
export default {
	name: 'LoginView',
	components: { BottomModal },
	setup() {
		const http = inject(provider.HTTP.VASELINE)
		const transaction = ref({
			amount: 0,
			memo: '',
		})
		const toggle = ref(false)
		const event = {
			click: () => {
				console.log('click')
				location.href = 'http://localhost:8080/oauth2/authorization/google'
				// location.href = 'http://ec2-3-34-252-227.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google'
			},
			click2: () => {
				console.log('click')
				location.href = 'http://localhost:8080/oauth2/authorization/kakao'
			},
			click3: () => {
				console.log('click')
				location.href = 'http://localhost:8080/oauth2/authorization/naver'
			},
			click4: () => {
				console.log('click')
				location.href = 'http://localhost:8080/oauth2/authorization/facebook'
			},
			click5: () => {
				console.log('myrythm')
				http.get('/api/app/my-rythm').then(res => {
					console.log('res', res)
				})
			},
		}

		return {
			event,
			toggle,
		}
	},
}
</script>

<style scoped></style>
