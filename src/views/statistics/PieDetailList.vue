<template>
	<div class="container">
		<div class="dp-f align-items-center container ph-12 pv-8 bdr-4 bg-light-grey2 fs-12 fc-medium-grey">
			<template v-for="(headerData, no) in headerDatas" :key="no">
				<div :class="headerData.class">{{ headerData.title }}</div>
			</template>
		</div>
		<slot />
	</div>
</template>

<script>
export default {
	name: 'PieDetailList',
	components: {},
	props: {
		headerDatas: {
			type: Array,
			default: () => {
				return []
			},
		},
	},
	setup() {
		return {}
	},
}
</script>

<style scoped></style>
