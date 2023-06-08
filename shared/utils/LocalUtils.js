export class LocalUtils {
	static allLocales = [
		{
			fr: {
				hello: 'Bonjour!',
			},
			en: {
				hello: 'Hello!',
			},
			nl: {
				hello: 'Halo!',
			},
		},
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
