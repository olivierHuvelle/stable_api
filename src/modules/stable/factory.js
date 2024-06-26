import { faker } from '@faker-js/faker'
import { BaseFactory } from '@/core/BaseFactory'

// this has been implemented to handle multi-company later
export class StableFactory extends BaseFactory {
	static create() {
		return {
			name: faker.company.name(),
			vat: this._generateBelgianVatNumber(),
			phone: faker.phone.number(),
			email: faker.internet.email(),
			invoicePrefix: '',
			address: faker.location.streetAddress(),
			iban: 'BE68539007547038',
			...this._create(),
		}
	}

	static _generateBelgianVatNumber() {
		let vat = 'BE'
		for (let i = 0; i < 10; i++) {
			vat += Math.floor(Math.random() * 10).toString()
		}
		return vat
	}

	static createBonnet() {
		return {
			name: 'Ecuries Bonnet',
			vat: 'BE0123456789',
			phone: '+32(0)494.91.08.85',
			email: 'ecurie.bonnet@gmail.com',
			address: '1A rue du Chaumont, 1460 Ittre',
			iban: 'BE68539007547034',
			invoicePrefix: '',
			...this._create(),
		}
	}
}
