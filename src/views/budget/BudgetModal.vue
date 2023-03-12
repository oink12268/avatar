<template>
	<div class="ta-r"><img class="wh-50" :src="$filters.getImagePath('plus_big.png')" @click="event.close" /></div>
	<bottom-modal :is-open="isOpen" @close="event.close">
		<div class="container pv-12 fs-12 fw-500 fc-medium-grey">자산명</div>
		<div class="input-field-line-con value-check active">
			<input type="text" placeholder="국민은행(적금)" v-model="budget.budgetName" />
		</div>

		<div class="container pv-12 fs-12 fw-500 fc-medium-grey">1금액</div>
		<div class="input-field-line-con value-check active">
			<input type="number" v-model="budget.balance" />
		</div>
		<div class="flex1 fw-500 ellipsis fs-16">사용여부</div>
		<div class="ml-at dp-if align-items-center">
			<switch-button id="DELIVERY_COMPLETE" v-model="budget.isUse" />
		</div>
		<div class="container dp-f align-items-center mt-10">
			<button class="button-rectangle size-100 large hp-54" @click="event.save">{{ isEdit ? '수정' : '저장' }}</button>
		</div>
	</bottom-modal>
</template>

<script>
import BottomModal from '@/components/popup/BottomModal'
import SwitchButton from '@/components/common/SwitchButton'
import axios from 'axios'
export default {
	name: 'BudgetModal',
	components: { BottomModal, SwitchButton },
	props: {
		isOpen: {
			type: Boolean,
			default: false,
		},
		isEdit: {
			type: Boolean,
			default: false,
		},
		budget: {
			type: Object,
			default: () => {
				return {
					budgetName: '',
					balance: 0,
					isUse: true,
				}
			},
		},
	},
	setup(props) {
		const event = {
			save: () => {
				axios.post('/api/app/budget', props.budget).then(res => {
					isOpen.value = false
				})
			},
			close: () => {
				props.isEdit = false
				props.isOpen = false
			},
		}

		return {
			event,
		}
	},
}
</script>

<style scoped></style>
