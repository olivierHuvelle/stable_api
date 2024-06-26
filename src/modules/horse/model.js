import { Model, DataTypes } from 'sequelize'
import i18next from 'i18next'

export class Horse extends Model {
	static getTable() {
		return 'horses'
	}

	static getModelName() {
		return 'Horse'
	}

	static associate(models) {
		Horse.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' })
		Horse.belongsTo(models.Pension, { foreignKey: 'pensionId', as: 'pension' })
		Horse.belongsTo(models.Ride, { foreignKey: 'rideId', as: 'ride' })
		Horse.belongsToMany(models.User, {
			through: models.HorseUser,
			foreignKey: 'horseId',
			otherKey: 'userId',
			as: 'horsemen',
		})
		Horse.belongsToMany(models.Pension, {
			through: models.PensionData,
			foreignKey: 'horseId',
			otherKey: 'pensionId',
			as: 'horsePensionDatas',
		})
		Horse.hasMany(models.AdditiveData, {
			foreignKey: 'horseId',
			as: 'additiveDatas',
		})
		Horse.belongsToMany(models.Ride, {
			through: models.RideData,
			foreignKey: 'horseId',
			otherKey: 'rideId',
			as: 'horseRideDatas',
		})
		Horse.hasMany(models.DailyRide, { foreignKey: 'horseId', as: 'dailyRides' })

		Horse.hasMany(models.HorseContributorHorseContributorJob, {
			foreignKey: 'horseId',
			as: 'horseContributorHorseContributorJobs',
		})
	}
}

export default function (sequelize) {
	Horse.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			ownerId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					isInt: {
						msg: i18next.t('horse_sql_validation_ownerId_isInt'),
					},
					min: {
						args: [1],
						msg: i18next.t('horse_sql_validation_ownerId_min'),
					},
				},
			},
			pensionId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				validate: {
					isInt: {
						msg: i18next.t('horse_sql_validation_pensionId_isInt'),
					},
					min: {
						args: [1],
						msg: i18next.t('horse_sql_validation_pensionId_min'),
					},
				},
			},
			rideId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				validate: {
					isInt: {
						msg: i18next.t('horse_sql_validation_rideId_isInt'),
					},
					min: {
						args: [1],
						msg: i18next.t('horse_sql_validation_rideId_min'),
					},
				},
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: i18next.t('horse_sql_validation_name_notEmpty'),
					},
				},
				set(value) {
					this.setDataValue('name', value.trim())
				},
			},
			comment: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: Horse.getModelName(),
			tableName: Horse.getTable(),
		}
	)

	return Horse
}
