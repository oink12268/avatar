import axios from 'axios'
import { toQueryString } from '@/global/utils'

const onRequestFulfilled = config => {
	config.headers['Cookie'] = document.cookie
	return config
}

export default class Http {
	constructor(baseUrl, successCallback, errorCallback) {
		this.baseUrl = baseUrl
		const baseHeader = {
			'Content-Type': 'application/json;charset=UTF-8',
			Accept: 'application/json',
			// 'Access-Control-Allow-Origin': '*',
			// 'Access-Control-Allow-Headers': '*',
			// 'Access-Control-Allow-Credentials': 'true',
		}

		this.service = axios.create({
			baseURL: baseUrl,
			headers: baseHeader,
			timeout: 1000 * 15,
		})
		this.service.defaults.withCredentials = true
		this.#setResponseCallBack(successCallback, errorCallback)
		// this.service.interceptors.request.use(function (config) {
		// 	return onRequestFulfilled(config)
		// })
	}

	#setResponseCallBack(successCallback, errorCallback) {
		if (!successCallback && typeof successCallback !== 'function') {
			this.successCallback = res => {
				return res.data
			}
		} else this.successCallback = successCallback

		if (!errorCallback && typeof successCallback !== 'function') {
			this.errorCallback = error => {
				return Promise.reject(error)
			}
		} else this.errorCallback = errorCallback
	}
	#send(httpMethod) {
		return httpMethod.then(this.successCallback).catch(this.errorCallback)
	}
	post(url, param) {
		// url = this.baseUrl + url
		return this.#send(this.service.post(url, param))
	}
	get(url, param = null) {
		if (url.indexOf('?') === -1 && param && Object.keys(param).length !== 0) url += '?'

		// url = this.baseUrl + url
		if (param && Object.keys(param).length > 0) return this.#send(this.service.get(`${url}&${toQueryString(param)}`))
		else return this.#send(this.service.get(url))
	}
}
