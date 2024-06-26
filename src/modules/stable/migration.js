import { Stable } from '@/modules/stable/model'
import { DataTypes } from 'sequelize'

export const upStable = async (queryInterface, Sequelize) =>
	queryInterface.createTable(Stable.getTable(), {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		vat: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		address: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		iban: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		invoicePrefix: {
			type: DataTypes.STRING,
			allowNull: true,
			default: '',
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE,
		},
	})

export const downStable = async queryInterface => queryInterface.dropTable(Stable.getTable())
