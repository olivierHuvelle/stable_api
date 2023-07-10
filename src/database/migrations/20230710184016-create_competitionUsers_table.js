import { DataTypes } from 'sequelize'
import { Competition } from '@/modules/competition/model'
import { User } from '@/modules/authentication/model'
import { CompetitionUser } from '@/database/models/competition-user'

export const up = async (queryInterface, Sequelize) =>
	queryInterface.createTable(CompetitionUser.getTable(), {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: User.getTable(),
				field: 'id',
			},
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
		},
		competitionId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Competition.getTable(),
				field: 'id',
			},
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE',
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

export const down = async queryInterface => queryInterface.dropTable(CompetitionUser.getTable())
