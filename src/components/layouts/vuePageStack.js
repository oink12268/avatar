import menuComposable from '@/composables/menuComposable'

const serviceStackReplace = (router, service) => {
	const { findFirstPathByService } = menuComposable()
	const info = findFirstPathByService(service)
	router.push(`${service}`)
	// router.push(`${service}/${info.path}`)
	// services.push(service)
}

export { serviceStackReplace }
