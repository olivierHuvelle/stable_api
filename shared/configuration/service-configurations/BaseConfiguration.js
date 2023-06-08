export class StableMissingConfigArgumentError extends Error {
	constructor(message) {
		super(message)
		this.name = 'MISSING_CONFIG_ARGUMENT_ERROR'
	}
}

export class StableInvalidConfigArgumentTypeError extends Error {
	constructor(message) {
		super(message)
		this.name = 'INVALID_CONFIG_ARGUMENT_TYPE_ERROR'
	}
}

export class StableInvalidConfigArgumentValueError extends Error {
	constructor(message) {
		super(message)
		this.name = 'INVALID_CONFIG_ARGUMENT_VALUE_ERROR'
	}
}

export class BaseConfiguration {
	constructor() {
		if (this.constructor === BaseConfiguration) {
			throw new Error('BaseConfiguration should not be instantiated')
		}
	}

	checkMandatoryArgument(argumentName) {
		if (process.env[argumentName] === undefined || process.env[argumentName].trim() === '') {
			throw new StableMissingConfigArgumentError(`missing mandatory ${argumentName} key`)
		}
	}

	checkPort(argumentName) {
		this.checkMandatoryArgument(argumentName)
		if (isNaN(parseInt(process.env[argumentName], 10))) {
			throw new StableInvalidConfigArgumentTypeError(
				`invalid type of ${argumentName} which must be a valid integer`
			)
		}
		if (parseInt(process.env[argumentName], 10) <= 0) {
			throw new StableInvalidConfigArgumentValueError(
				`invalid value of ${argumentName} which must be a strict positive integer`
			)
		}
	}
}
