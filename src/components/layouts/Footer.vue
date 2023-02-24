<template>
	<div class="footer-bar">
		<button :class="{ active: selectedService === 'transaction' }" @click="event.go('transaction')">
			<i class="ic24_receipt_filled" />
		</button>
		<button :class="{ active: selectedService === 'statistics' }" @click="event.go('statistics')">
			<i class="ic24_graph_filled" />
		</button>
	</div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { serviceStackReplace } from '@/components/layouts/vuePageStack'

export default {
	name: 'Footer',
	props: {
		service: {
			type: String,
		},
	},
	setup(props) {
		const router = useRouter()
		const route = useRoute()
		const selectedService = ref(props.service)

		const event = {
			go: service => {
				serviceStackReplace(router, service)
			},
		}

		watch(
			() => route.path,
			_ => {
				selectedService.value = route.params.service
			},
		)

		return {
			event,
			selectedService,
		}
	},
}
</script>

<style scoped></style>
