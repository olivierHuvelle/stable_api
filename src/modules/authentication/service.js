import db from '@/database'
import createError from 'http-errors'
import i18next from '../../../i18n'

export class AuthenticationService {
	constructor() {}

	async register(data) {
		return await db.models.User.create(data)
	}

	async confirm(confirmationCode) {
		const user = await this.findUserByConfirmPasswordOrFail(confirmationCode)
		if (user.status === 'ACTIVE') {
			throw createError(422, i18next.t('authentication_already_confirmed'))
		}
		user.status = 'ACTIVE'
		return await user.save()
	}

	async login(data) {
		const user = await this.findUserByEmailOrFail(data.email)
		await this.validatePassword(user, data.password)
		if (user.status !== 'ACTIVE') {
			throw createError(400, i18next.t('authentication_login_user_unconfirmed'))
		}
		const token = user.generateToken()
		const refreshToken = user.generateToken('2h')
		return {
			token,
			refreshToken,
		}
	}

	async delete(user) {
		return await user.destroy()
	}

	async update(user, data) {
		return await user.set(data).save()
	}

	async findUserByConfirmPasswordOrFail(confirmationCode) {
		const user = await db.models.User.findOne({ where: { confirmationCode } })
		if (!user) {
			throw createError(404, i18next.t('authentication_404'))
		}
		return user
	}

	async findUserByEmailOrFail(email) {
		const user = await db.models.User.findOne({ where: { email } })
		if (!user) {
			throw createError(404, i18next.t('authentication_404'))
		}
		return user
	}

	async validatePassword(user, password) {
		const isPasswordValid = await user.validatePassword(password)
		if (!isPasswordValid) {
			throw createError(400, i18next.t('authentication_login_password_invalid'))
		}
		return isPasswordValid
	}
}
