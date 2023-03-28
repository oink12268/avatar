<template>
	<div
		class="tab-list-con bg-white"
		:class="[
			{
				sticky: isSticky,
				'after-none': type !== 'underline',
			},
			...tabWrapClasses,
		]"
	>
		<ul :class="tabStyles">
			<li
				v-for="(tab, no) in tabs"
				:key="tab.title"
				:class="[{ active: selectedTitle === tab.title }, ...tabClasses]"
				@click="event.click(tab, no)"
			>
				{{ tab.title }}
				<template v-if="isCustomTitle">
					<slot :name="'customTitle' + no" />
				</template>
			</li>
		</ul>
	</div>
</template>

<script>
import { ref, computed, watch, inject } from 'vue'
import { provider } from '@/global/constants/constants'

export default {
	name: 'TabButton',
	props: {
		type: {
			type: String,
			default: 'underline',
			validator: value => {
				return ['underline', 'rectangle', 'circle', 'small-circle', 'large-circle'].indexOf(value) !== -1
			},
		},
		isSticky: {
			type: Boolean,
			default: false,
		},
		isCustomTitle: {
			type: Boolean,
			default: false,
		},
		selected: {
			type: String,
		},
		tabs: {
			type: Array,
			default: () => {
				return []
			},
		},
		tabWrapClasses: {
			type: Array,
			default: () => {
				return []
			},
		},
		tabClasses: {
			type: Array,
			default: () => {
				return [''] // ['size-25', '...']
			},
		},
	},
	emits: ['change'],
	setup(props, { emit }) {
		const eventBus = inject(provider.EVENT_BUS)
		const afterClass = ref('')
		const selectedTitle = ref('')

		const tabStyles = computed(() => {
			if (props.type === 'underline') return 'tab-type-a'
			else if (props.type === 'rectangle') return 'tab-type-b'
			else if (props.type === 'circle') return 'tab-type-d'
			else if (props.type === 'small-circle') return 'tab-type-c'
			else if (props.type === 'large-circle') return 'tab-type-e'
			return ''
		})

		const event = {
			click: (tab, no) => {
				selectedTitle.value = tab.title
				emit('change', selectedTitle.value, tab)
			},
		}

		watch(
			() => props.selected,
			payload => {
				const idx = props.tabs.map(tab => tab.title).indexOf(payload)
				if (idx === -1) return
				selectedTitle.value = props.tabs[idx].title
				// console.log('props.selected', selectedTitle.value)
			},
			{ immediate: true },
		)

		watch(
			() => props.isSticky,
			value => {
				eventBus.emit('apply-sticky-scroll-event', value)
			},
		)

		return {
			tabStyles,
			selectedTitle,
			event,
			afterClass,
		}
	},
}
</script>

<style scoped>
.tab-list-con.order {
	z-index: 1;
	position: fixed;
	top: 48px;
	background-color: #fff !important;
	transition: top 0.2s;
}

.tab-list-con.order.sticky {
	position: fixed !important;
	top: 10px !important;
	box-shadow: 0 5px 6px 0 rgb(0 0 0 / 16%);
}
</style>
