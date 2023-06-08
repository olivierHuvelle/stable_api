import { BaseConfiguration } from './BaseConfiguration.js'

export class ServerConfiguration extends BaseConfiguration {
	static instance = undefined

	constructor() {
		if (ServerConfiguration.instance === undefined) {
			super()
			this.port = process.env.SERVER_PORT
			ServerConfiguration.instance = this
		}
		return ServerConfiguration.instance
	}

	get port() {
		return this._port
	}

	set port(value) {
		this.checkPort('SERVER_PORT')
		this._port = parseInt(value, 10)
	}
}
