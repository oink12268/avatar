<template>
	<transition name="fade">
		<div class="modal-wrap ph-40" v-if="isShow">
			<div class="modal-background" @click="onClose"></div>
			<div class="option-layer">
				<div class="container ta-r">
					<button class="ic24_close_bold ic_medium-grey" @click="onClose"></button>
				</div>
				<slot></slot>
			</div>
		</div>
	</transition>
</template>

<script>
import { watch } from 'vue'
import modalComposable from '@/composables/modalComposable'

export default {
	name: 'BottomModal',
	emits: ['close'],
	props: {
		isOpen: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { emit }) {
		const { isShow, showModal, hideModal } = modalComposable()
		watch(
			() => props.isOpen,
			show => {
				if (show) showModal()
				else if (isShow.value) hideModal()
			},
			// { immediate: true }, // 절대 금지
		)
		const onClose = () => {
			emit('close')
		}
		return {
			isShow,
			onClose,
		}
	},
}
</script>

<style scoped></style>
