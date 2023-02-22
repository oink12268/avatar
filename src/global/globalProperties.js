/* app.config.globalProperties 가 안먹을떄 (app이 틀릴때) 전역변수 등록 */
import { windowEvent } from '@/global/constants/eventConstants'

window.globalProperties = {}
window.globalProperties[windowEvent.GET_OPENABLE_MODAL] = false // 디폴트값
window.globalProperties[windowEvent.SET_OPENABLE_MODAL] = isOpenable => {
	window.globalProperties[windowEvent.GET_OPENABLE_MODAL] = isOpenable
}

window.globalProperties[windowEvent.GET_OS_TYPE] = 'unknown'
window.globalProperties[windowEvent.SET_OS_TYPE] = osType => {
	window.globalProperties[windowEvent.GET_OS_TYPE] = osType
}
