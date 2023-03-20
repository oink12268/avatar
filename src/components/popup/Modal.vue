<template>
	<teleport to="body">
		<transition name="fade">
			<div class="modal-wrap ph-40" v-if="isShow">
				<div class="modal-background"></div>
				<div class="alert-box">
					<slot></slot>
				</div>
			</div>
		</transition>
	</teleport>
</template>

<script>
import { watch } from 'vue'
import { windowEvent } from '@/global/constants/eventConstants'
import modalComposable from '@/composables/modalComposable'

export default {
	name: 'Modal',
	props: {
		isOpen: {
			type: Boolean,
			default: false,
		},
		isHistoryBack: {
			type: Boolean,
			default: true,
		},
	},
	setup(props) {
		const { isShow, showModal, hideModal } = modalComposable()
		watch(
			() => props.isOpen,
			show => {
				if (show) {
					window.globalProperties[windowEvent.SET_OPENABLE_MODAL](true)
					showModal(props.isHistoryBack)
				} else if (isShow.value) {
					window.globalProperties[windowEvent.SET_OPENABLE_MODAL](false)
					hideModal(props.isHistoryBack)
				}
			},
			{ immediate: true },
		)
		return {
			isShow,
		}
	},
}
</script>

<style lang="scss" scoped></style>
