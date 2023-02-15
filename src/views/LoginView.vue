<template>
	<div class="container ph-16">
		<h1 class="display-1">Login</h1>
		<div class="dp-f center">
			<img class="wd-150 hp-40" src="../assets/btn_google_signin_dark_focus_web.png" @click="event.click" />
			<img class="wd-150 hp-40" src="../assets/kakao_login_medium_narrow.png" @click="event.click2" />
			<img class="wd-150 hp-40" src="../assets/naver_login.png" @click="event.click3" />
			<img class="wd-150 hp-40" src="../assets/naver_login.png" @click="event.click4" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'LoginView',
	components: {},
	setup() {
		const event = {
			click: () => {
				console.log('click')
				location.href = 'http://localhost:8080/oauth2/authorization/google'
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
		}

		return {
			event,
		}
	},
}
</script>

<style scoped></style>
