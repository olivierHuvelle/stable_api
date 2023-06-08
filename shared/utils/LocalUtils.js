import { locales as middlewareLocales } from '../../middlewares/locales.js'

export class LocalUtils {
	static allLocales = [
		{
			fr: {
				not_found: 'Resource non trouvée',
				error_unhandled_message: 'Une erreur est survenue',
			},
			en: {
				not_found: 'Resource not found',
				error_unhandled_message: 'An error occurred',
			},
			nl: {
				not_found: 'Bron niet gevonden ',
				error_unhandled_message: 'Er is een fout opgetreden',
			},
		},
		middlewareLocales,
	]

	static getLocales() {
		let locales = { fr: {}, en: {}, nl: {} }
		this.allLocales.forEach(locale => {
			for (const lang in locale) {
				locales[lang] = { ...locales[lang], ...locale[lang] }
			}
		})
		return locales
	}
}
