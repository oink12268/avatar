<template>
	<div class="title-bar zx-1">
		<h3 v-if="!isCustomTitle">{{ title }}</h3>
		<slot />
	</div>
</template>

<script>
export default {
	name: 'TitleHeader',
	props: {
		title: {
			type: String,
			default: '',
		},
		isCustomTitle: {
			type: Boolean,
			default: false,
		},
	},
}
</script>

<style scoped></style>
