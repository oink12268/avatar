import Http from './http'

const responseSuccess = res => {
	return Promise.resolve(res.data)
}

const responseError = e => {
	const response = e.response
	const status = e.response?.status
	const code = e.code

	return Promise.reject(e)
}

function vaseline() {
	return new Http(process.env.VUE_APP_VASELINE_API_URL, responseSuccess, responseError)
}

export { vaseline as vaselineHttpClient }
