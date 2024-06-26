import { Model, DataTypes } from 'sequelize'
import i18next from '../../../i18n'

export class Invoice extends Model {
	static getTable() {
		return 'invoices'
	}

	static getModelName() {
		return 'Invoice'
	}

	static associate(models) {
		Invoice.belongsTo(models.User, { foreignKey: 'clientId', as: 'client' })
		Invoice.belongsTo(models.Horse, { foreignKey: 'horseId', as: 'horse' })
		Invoice.hasOne(models.Cron, { foreignKey: 'invoiceId', as: 'cron' })
	}
}

export default function (sequelize) {
	Invoice.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			clientId: {
				type: DataTypes.INTEGER,
				allowNull: true, // to prevent data lost if client deleted its account
			},
			horseId: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			bucket: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			key: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			number: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: {
						args: [1],
						msg: i18next.t('invoice_sql_validation_number_min'),
					},
				},
			},
			price: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				validate: {
					min: {
						args: [0.0],
						msg: i18next.t('invoice_sql_validation_price_min'),
					},
				},
			},
			status: {
				type: DataTypes.ENUM,
				allowNull: false,
				values: ['UNPAID', 'PAID'],
			},
			period: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			dueDateAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			paidAt: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: Invoice.getModelName(),
			tableName: Invoice.getTable(),
		}
	)
	return Invoice
}
