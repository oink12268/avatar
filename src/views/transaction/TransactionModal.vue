<template>
	<div class="ta-r"><img class="wh-50" :src="$filters.getImagePath('plus_big.png')" @click="isOpen = true" /></div>

	<bottom-modal :is-open="isOpen" @close="isOpen = false">
		<div class="container pv-12 fs-12 fw-500 fc-medium-grey">금액</div>
		<div class="input-field-line-con value-check active">
			<input type="number" placeholder="10,000" value="" />
		</div>

		<div class="container pv-12 fs-12 fw-500 fc-medium-grey">메모</div>
		<div class="input-field-line-con value-check active">
			<input type="text" value="" />
		</div>
		<div class="container dp-f align-items-center mt-10">
			<button class="button-rectangle size-50 large hp-54">수입</button>
			<button class="button-rectangle size-50 large hp-54">지출</button>
		</div>
	</bottom-modal>
</template>

<script>
import { ref } from 'vue'
import BottomModal from '@/components/popup/BottomModal'

export default {
	name: 'TransactionModal',
	components: { BottomModal },
	setup() {
		const isOpen = ref(false)
		return {
			isOpen,
		}
	},
}
</script>

<style scoped></style>
