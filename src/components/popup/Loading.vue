<template>
	<teleport to="body">
		<transition name="fade">
			<div class="modal-wrap ph-40" v-if="isShow">
				<div class="modal-background"></div>
				<div class="loading">
					<div class="align-items-center ta-c">
						<template v-if="loadingType.RECEIPT_PRINT === option">
							<img :src="getImage('loading.png')" alt="apng" />
							<span class="fs-14 fc-white">{{ message }}</span>
						</template>
						<template v-else-if="loadingType.DOT === option">
							<img :src="getImage('loading_48.png')" alt="apng" />
						</template>
					</div>
				</div>
			</div>
		</transition>
	</teleport>
</template>

<script>
import { ref, inject, onMounted } from 'vue'
import { loadingType, provider } from '@/global/constants/constants'
import { eventBusMessage } from '@/global/constants/eventConstants'
import { getImagePath } from '@/global/utils'

export default {
	name: 'Loading',
	setup() {
		const eventBus = inject(provider.EVENT_BUS)
		const option = ref(loadingType.RECEIPT_PRINT)
		const isShow = ref(false)
		const message = ref('주문을 불러오는 중')

		const on = (msg = '', options = {}) => {
			option.value = loadingType.RECEIPT_PRINT

			if (Object.keys(options).length > 0 && options.type) option.value = options.type
			if (msg && option.value === loadingType.RECEIPT_PRINT) message.value = msg

			isShow.value = true
			eventBus.emit(eventBusMessage.GET_DATA_COMPLETE_LOADING, false)
		}
		const off = () => {
			isShow.value = false
			eventBus.emit(eventBusMessage.GET_DATA_COMPLETE_LOADING, true)
		}

		// template 에서 $filters 가 안먹네
		const getImage = src => {
			return getImagePath(src)
		}

		onMounted(_ => {
			const randomId = Math.floor(Math.random() * 1000)
			// console.log('onMounted', randomId)
		})

		return {
			isShow,
			on,
			off,
			message,
			option,
			loadingType,
			getImage,
		}
	},
}
</script>

<style scoped>
.modal-background {
	opacity: 0.7 !important;
	background-color: #000 !important;
}
.loading {
	position: absolute;
	width: 120px;
	height: 120px;
	top: 45%;
	left: 50%;
	z-index: 101;
	transform: translate(-50%, -50%);
}
</style>
