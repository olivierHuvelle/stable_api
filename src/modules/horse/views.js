export class HorseView {
	constructor() {}

	index(horses) {
		return horses.map(horse => {
			return this.show(horse)
		})
	}

	show(horse) {
		return {
			id: horse.id,
			name: horse.name,
			comment: horse.comment,
			createdAt: horse.createdAt,
			updatedAt: horse.updatedAt,
			owner: {
				email: horse.owner.email,
				userId: horse.owner.contact.userId,
				firstName: horse.owner.contact.firstName,
				lastName: horse.owner.contact.lastName,
				phone: horse.owner.contact.phone,
				mobile: horse.owner.contact.mobile,
				address: horse.owner.contact.address,
				invoicingAddress: horse.owner.contact.invoicingAddress,
			},
			pension: this._getPensionView(horse),
			horsemen: this._getHorsemenView(horse),
		}
	}

	create(horse) {
		return this.show(horse)
	}

	update(horse) {
		return this.show(horse)
	}

	_getPensionView(horse) {
		if (horse.pension) {
			return {
				name: horse.pension.name,
				monthlyPrice: horse.pension.monthlyPrice,
				description: horse.pension.description,
			}
		}
		return null
	}

	_getHorsemenView(horse) {
		if (horse.horsemen.length) {
			return horse.horsemen.map(horseman => {
				return {
					email: horseman.email,
					userId: horseman.contact.userId,
					firstName: horseman.contact.firstName,
					lastName: horseman.contact.lastName,
					phone: horseman.contact.phone,
					mobile: horseman.contact.mobile,
					address: horseman.contact.address,
					invoicingAddress: horseman.contact.invoicingAddress,
				}
			})
		}
		return []
	}
}