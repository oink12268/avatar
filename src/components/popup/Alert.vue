<template>
	<modal :is-open="isShow" :is-history-back="false" v-if="isMount">
		<p v-html="toHtml(message)"></p>
		<div v-if="type === 'alert'" class="dp-f container align-items-center">
			<button class="button-rectangle flex1 bg-white fc-dark-grey" @click="onOk">확인</button>
		</div>
		<div v-if="type === 'confirm'" class="dp-f container align-items-center">
			<button class="button-rectangle flex1 bg-white" @click="onCancel">취소</button>
			<button class="button-rectangle flex1 bg-white fc-dark-grey" @click="onOk">확인</button>
		</div>
	</modal>
</template>

<script>
import { ref } from 'vue'
import Modal from '@/components/popup/Modal'
export default {
	name: 'Alert',
	components: {
		Modal,
	},
	props: {
		type: {
			type: String,
			default: 'alert',
		},
		message: {
			type: String,
			default: '',
		},
	},
	setup() {
		const isShow = ref(false)
		const isMount = ref(false)
		let resolve = null
		let reject = null
		const open = () => {
			return new Promise((res, rej) => {
				isShow.value = true
				isMount.value = true
				resolve = res
				reject = rej
			})
		}
		const onCancel = () => {
			resolve(false)
			modalClose()
		}
		const onOk = () => {
			resolve(true)
			modalClose()
		}
		const modalClose = () => {
			//transition 떄문에 아래와 같이 처리함
			isShow.value = false
			setTimeout(() => {
				isMount.value = false
			}, 50)
		}
		const isCheckRegExpMsg = msg => {
			const reg = new RegExp(/(<([^>]+)>)/gi)
			let isRegCheck = false
			if (msg.match(reg)) isRegCheck = true
			return isRegCheck
		}
		const toHtml = message => {
			if (typeof str !== 'string') return message
			if (isCheckRegExpMsg(message)) return message
			return message.replace(/(?:\r\n|\r|\n)/g, '<br/>')
		}
		return {
			isMount,
			isShow,
			toHtml,
			open,
			onOk,
			onCancel,
		}
	},
}
</script>

<style scoped></style>
