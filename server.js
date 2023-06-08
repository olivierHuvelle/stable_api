import express from 'express'
import { EnvConfiguration } from './shared/configuration/EnvConfiguration.js'
import { ServerConfiguration } from './shared/configuration/service-configurations/ServerConfiguration.js'

new EnvConfiguration('DEV')
const serverConfig = new ServerConfiguration()

const app = express()

app.get('/', (request, response) => {
	response.send('hello world')
})

app.listen(serverConfig.port, () => {
	console.log(`App listening on port ${serverConfig.port}`)
})
