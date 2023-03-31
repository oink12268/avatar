<template>
	<!-- 헤더 : 시작-->
	<title-header :is-custom-title="true">
		<button v-if="type === 'back'" class="button-history" @click="event.back">
			<i class="ic24_arrow_l_bold ic_medium-grey" />
		</button>
		<h3>
			<slot />
		</h3>
		<slot name="tooltip" />
		<button v-if="type === 'close'" @click="event.back">
			<i class="ic24_close_bold ic_medium-grey" />
		</button>
	</title-header>
	<!-- 헤더 : 끝-->
</template>

<script>
import { useRouter } from 'vue-router'
import TitleHeader from '@/components/layouts/TitleHeader.vue'

export default {
	name: 'BackHeader',
	components: { TitleHeader },
	props: {
		type: {
			type: String,
			default: 'back',
			validator: value => {
				return ['back', 'close', 'no'].indexOf(value) !== -1
			},
		},
		backHandler: {
			type: Function,
			default: null,
		},
	},
	setup(props) {
		const router = useRouter()
		const event = {
			back: () => {
				if (props.backHandler) {
					props.backHandler()
					return
				}
				router.back()
			},
		}
		return {
			event,
		}
	},
}
</script>

<style scoped>
.title-bar.sticky {
	box-shadow: 0 5px 6px 0 rgb(0 0 0 / 16%);
}
</style>
