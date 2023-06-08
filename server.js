import express from 'express'
import i18next from './i18n.js'

const app = express()

app.get('/', (request, response) => {
	response.send(i18next.t('hello'))
})

app.listen(3000, () => {
	console.log(`App listening on port ${3000}`)
})
