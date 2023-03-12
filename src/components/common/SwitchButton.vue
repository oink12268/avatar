<template>
	<label class="button-input pr-0 height-auto">
		<span v-if="!noLabel" :class="clazz">{{ label }}</span>
		<div class="button-switch">
			<input type="checkbox" class="checkbox-switch" v-model="checked" :disabled="disabled" @change="onChange" />
			<div class="knobs"></div>
			<div class="layer"></div>
		</div>
	</label>
</template>

<script>
import { ref, watch, watchEffect } from 'vue'
export default {
	name: 'SwitchButton',
	props: {
		id: {
			type: String,
			default: '',
			require: false,
		},
		noLabel: {
			type: Boolean,
			default: false,
		},
		onLabel: {
			type: String,
			default: '사용',
		},
		offLabel: {
			type: String,
			default: '사용안함',
		},
		onOff: {
			type: String,
			default: 'N',
		},
		modelValue: {
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
			require: false,
		},
	},
	emits: ['state', 'stateById', 'update:modelValue'],

	setup(props, { emit }) {
		const onClazz = 'text fs-12 fc-blue'
		const offClazz = 'text fs-12 fc-grey'
		const checked = ref(false)
		const label = ref(props.offLabel)
		const clazz = ref(offClazz)

		watch(
			() => props.modelValue,
			(newValue, oldValue) => {
				checked.value = newValue
				setTimeout(() => {
					label.value = checked.value ? props.onLabel : props.offLabel
					clazz.value = checked.value ? onClazz : offClazz
				}, 250)
			},
			{ immediate: true },
		)

		const onChange = () => {
			emit('update:modelValue', checked.value)
			emit('state', checked.value)
			emit('stateById', { id: props.id, checked: checked.value })
		}
		return {
			label,
			checked,
			clazz,
			onChange,
		}
	},
}
</script>

<style scoped></style>
