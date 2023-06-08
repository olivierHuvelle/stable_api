import rateLimit from 'express-rate-limit'
import i18next from '../i18n.js'

export const generalExceptLoginRateLimiter = rateLimit({
	windowMs: 60 * 1000, // 60 seconds in ms
	max: 60,
	message: i18next.t('too_many_request'),
	standardHeaders: true,
	legacyHeaders: false,
})
