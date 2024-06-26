import { Op } from 'sequelize'
import { BaseController } from '@/core/BaseController'
import { InvoiceService } from '@/modules/invoice/service'
import { InvoicePolicy } from '@/modules/invoice/policies'
import { InvoiceView } from '@/modules/invoice/views'
import { AwsService } from '@/utils/AwsUtils'
import { User } from '@/modules/authentication/model'
import { Contact } from '@/modules/contact/model'
import { Cron } from '@/modules/cron/model'

export class InvoiceController extends BaseController {
	constructor() {
		super(new InvoiceService(), new InvoicePolicy(), new InvoiceView())
		this._awsService = new AwsService(process.env.FILE_BUCKET)
		this._getRelationOptions = this._getRelationOptions.bind(this)
		this._getIndexWhereClause = this._getIndexWhereClause.bind(this)

		this.index = this.index.bind(this)
		this.show = this.show.bind(this)
		this.download = this.download.bind(this)
		this.markAsPaid = this.markAsPaid.bind(this)
		this.markAsUnpaid = this.markAsUnpaid.bind(this)
		this.upload = this.upload.bind(this)
		this.manualCreateInvoiceForUserId = this.manualCreateInvoiceForUserId.bind(this)
	}

	async index(request, response, next) {
		const { status, clientId, cronStatus, year, month } = request.query
		return await super.index(request, response, next, {
			...this._getRelationOptions(),
			...this._getIndexWhereClause(status, clientId, cronStatus, year, month),
		})
	}

	async show(request, response, next) {
		return await super.show(request, response, next, this._getRelationOptions())
	}

	async markAsPaid(request, response, next) {
		try {
			const { id } = request.params
			const paidAt = request.body.paidAt ? new Date(request.body.paidAt) : null
			let invoice = await this._service.findOrFail(id)
			await this._policy.markAsPaid(request, invoice)
			await this._service.markAsPaid(invoice, paidAt)
			invoice = await this._service.findOrFail(id, this._getRelationOptions())
			return response.status(200).json(this._view.markAsPaid(invoice))
		} catch (error) {
			return next(error)
		}
	}

	async markAsUnpaid(request, response, next) {
		try {
			const { id } = request.params
			let invoice = await this._service.findOrFail(id)
			await this._policy.markAsUnpaid(request, invoice)
			await this._service.markAsUnpaid(invoice)
			invoice = await this._service.findOrFail(id, this._getRelationOptions())
			return response.status(200).json(this._view.markAsUnpaid(invoice))
		} catch (error) {
			return next(error)
		}
	}

	async upload(request, response, next) {
		// this method is about to be deleted too
		try {
			return response.status(200).json({ file: request.file })
		} catch (error) {
			return next(error)
		}
	}

	async download(request, response, next) {
		try {
			const invoice = this._service.findOrFail(request.params.id, this._getRelationOptions())
			await this._policy.download(request, invoice)
			const awsObject = await this._awsService.findByKey(invoice.key)
			response.setHeader('Content-Type', 'application/pdf')
			response.setHeader('Content-Disposition', `attachment; filename=${invoice.key}.pdf`)
			response.send(awsObject.Body)
		} catch (error) {
			return next(error)
		}
	}

	async manualCreateInvoiceForUserId(request, response, next) {
		try {
			const { userId, period } = request.body
			const res = await this._service.manualCreateInvoiceForUserId(userId, period) // {invoices: [Invoice], errors: [error]}
			return response.status(200).json(this._view.create(res))
		} catch (error) {
			return next(error)
		}
	}

	_getRelationOptions() {
		return {
			include: [
				{
					model: User,
					as: 'client',
					attributes: ['email'],
					include: {
						model: Contact,
						as: 'contact',
					},
				},
				{
					model: Cron,
					as: 'cron',
				},
			],
		}
	}

	_getIndexWhereClause(status, clientId, cronStatus, year, month) {
		const yearDate = year ? new Date(`${year}-01-01`) : null

		if (month && yearDate) {
			yearDate.setMonth(month)
		}

		const queryConditions = [
			status ? { status } : null,
			clientId ? { clientId } : null,
			cronStatus ? { '$cron.status$': cronStatus } : null,
			year ? { createdAt: { [Op.gte]: yearDate } } : null,
		]

		if (queryConditions.filter(queryCondition => queryCondition).length === 0) {
			return {}
		}

		return {
			where: {
				[Op.and]: queryConditions.filter(queryCondition => queryCondition),
			},
		}
	}
}
