import express from 'express'
import createError from 'http-errors'
import helmet from 'helmet'
import cors from 'cors'
import router from '@/routes/routes'
import i18next from '../i18n'

import { Dotenv } from '@/utils/Dotenv'
import { generalExceptLoginRateLimiter } from '@/middlewares/rate-limiter'
import corsConfig from '@/configuration/cors'

const environment = new Dotenv()
const app = express()

//middlewares
app.disable('x-powered-by')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(cors(corsConfig))
if (environment.environment === 'PROD') {
	app.use(generalExceptLoginRateLimiter)
}

//routes
app.use(router)

// 404 and error handlers
app.use((req, res, next) => {
	next(createError(404, i18next.t('common_404')))
})

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, _next) => {
	const errorMessage = environment.environment === 'PROD' ? i18next.t('common_error') : error
	response.status(error.status || 500).json(errorMessage)
})

export default app
