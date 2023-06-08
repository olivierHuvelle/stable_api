import path from 'path'
import { config } from 'dotenv'
import Enum from 'enum'

import { PathUtils } from '../utils/PathUtils.js'
import { ServerConfiguration } from './service-configurations/ServerConfiguration.js'

export const EnvironmentEnum = new Enum({ PROD: '.env', DEV: '.env.dev' }, { freeze: true })

export class StableInvalidEnvironmentError extends Error {
	constructor() {
		super(`Invalid environment, allowed values : ${EnvironmentEnum.enums.map(env => env.key).join(',')}`)
		this.name = 'INVALID_ENVIRONMENT_ERROR'
	}
}

export class EnvConfiguration {
	// notice it is NOT a strict singleton as it is always possible to change the class from outside of the scope
	static instance = undefined

	constructor(environment) {
		if (EnvConfiguration.instance === undefined) {
			this.environment = environment
			config({ path: path.join(PathUtils.getRootPath(), EnvironmentEnum.get(this.environment).value) })
			EnvConfiguration.instance = this
			new ServerConfiguration()
		}
		return EnvConfiguration.instance
	}

	get environment() {
		return this._environment
	}

	set environment(value) {
		if (!EnvironmentEnum.isDefined(value)) {
			throw new StableInvalidEnvironmentError()
		}
		this._environment = value
	}
}
