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
	// return new Http('http://ec2-3-34-252-227.ap-northeast-2.compute.amazonaws.com:8080', responseSuccess, responseError)
	// return new Http(process.env.VUE_APP_VASELINE_API_URL, responseSuccess, responseError)
	return new Http('http://localhost:8080', responseSuccess, responseError)
}

export { vaseline as vaselineHttpClient }
