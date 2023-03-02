<template>
	<page>
		<app-side-menu v-if="isApp" />
		<agent-side-menu v-else />
	</page>
</template>

<script>
export default {
	name: 'SideMenuView',
}
</script>

<style scoped></style>
