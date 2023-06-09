import express from 'express'
import helmet from 'helmet'
import i18next from './i18n.js'
import expressWinston from 'express-winston'
import { requestLogger } from './shared/loggers/loggers.js'
import { errorHandlerLogger } from './shared/loggers/loggers.js'
import { EnvConfiguration } from './shared/configuration/EnvConfiguration.js'
import { ServerConfiguration } from './shared/configuration/service-configurations/ServerConfiguration.js'
import { generalExceptLoginRateLimiter } from './middlewares/rate-limiter.js'

new EnvConfiguration('DEV')
const serverConfig = new ServerConfiguration()

const app = express()

// middlewares
app.disable('x-powered-by')
app.use(helmet())
app.use(express.json())
app.use(generalExceptLoginRateLimiter)
app.use(
	expressWinston.logger({
		winstonInstance: requestLogger,
		statusLevels: true,
	})
)

// eslint-disable-next-line no-unused-vars
app.get('/', (request, response) => {
	response.send('hello')
})

app.use((_, response) => {
	response.status(404).send(i18next.t('not_found'))
})

app.use(
	expressWinston.errorLogger({
		winstonInstance: errorHandlerLogger,
		statusLevels: true,
	})
)

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, _) => {
	response.status(500).send(i18next.t('error_unhandled_message'))
})

app.listen(serverConfig.port, () => {
	console.log(`App listening on port ${serverConfig.port}`)
})
