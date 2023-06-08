import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import { EnvironmentEnum, EnvConfiguration } from './EnvConfiguration.js'
import { StableInvalidEnvironmentError } from './EnvConfiguration.js'
import { BaseConfiguration } from './service-configurations/BaseConfiguration.js'

describe('EnvConfiguration Class', function () {
	beforeEach(function () {
		EnvConfiguration.instance = undefined
	})

	afterEach(function () {
		EnvConfiguration.instance = undefined
	})

	it('Valid env does not throw an error', function () {
		EnvironmentEnum.enums
			.map(env => env.key)
			.forEach(env => {
				new EnvConfiguration(env)
				expect(1).to.equal(1)
			})
	})
	it('Invalid env does throw an InvalidEnvironmentError', function () {
		expect(() => new EnvConfiguration('INVALID_ENV')).to.throw(StableInvalidEnvironmentError)
	})
})

describe('BaseConfiguration Class', function () {
	it('Cannot instantiate abstract class', function () {
		expect(() => new BaseConfiguration()).to.throw
	})
})
