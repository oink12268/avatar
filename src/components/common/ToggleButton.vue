<template>
	<button
		class="button-toggle"
		:class="{ active: selected || modelValue }"
		:style="{ minHeight: isWrap ? '40px' : 'unset' }"
		:disabled="disabled"
		@click="onClick"
	>
		<div v-if="isWrap">
			<span class="dp-b ws-normal fs-12">
				<slot />
			</span>
		</div>
		<template v-else>
			<slot />
		</template>
	</button>
</template>

<script>
export default {
	name: 'ToggleButton',
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
		selected: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		keyValue: {
			type: [Number, String],
		},
		isWrap: {
			// 줄바꿈처리
			type: Boolean,
			default: false,
		},
	},
	emits: ['update:modelValue', 'change'],
	setup(props, { emit }) {
		const onClick = () => {
			emit('update:modelValue', !props.modelValue)
			emit('change', props.keyValue)
		}
		return {
			onClick,
		}
	},
}
</script>

<style scoped></style>
