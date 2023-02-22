import { menu } from '@/global/constants/pageConstants'

export default function menuComposable() {
	const menus = menu.MENU_LIST
	const transaction = menu.MENU_LIST[0]
	const statistics = menu.MENU_LIST[1]
	const list = []
	list.push(
		...transaction.tabs.map(x => {
			return { service: transaction.service, code: x.code, title: x.title, path: x.path }
		}),
	)
	list.push(
		...statistics.tabs.map(x => {
			return { service: statistics.service, code: x.code, title: x.title, path: x.path }
		}),
	)
	const allMenuTabsList = list

	const findFirstPathByService = service => {
		return allMenuTabsList.find(x => x.service === service)
	}

	return {
		menus,
		transaction,
		statistics,
		allMenuTabsList,
		findFirstPathByService,
	}
}
