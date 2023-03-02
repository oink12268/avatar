<template>
	<!-- 헤더 : 시작-->
	<div class="header-bar bg-white">
		<button class="button-list" @click="event.openSideMenu">
			<i class="ic32_hamberger" />
		</button>
	</div>
	<!-- 헤더 : 끝-->
</template>

<script>
export default {
	name: 'Header',
	setup() {
		const event = {
			openSideMenu: () => {},
		}

		return {
			event,
		}
	},
}
</script>

<style scoped>
.notice-green .select-box {
	color: #fff;
	border-bottom: 1px solid #fff;
}

.notice-green .ic24_arrow_d_filled {
	filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(30deg) brightness(104%) contrast(101%);
}

.header-bar.sticky {
	box-shadow: 0 5px 6px 0 rgb(0 0 0 / 16%);
}
</style>
