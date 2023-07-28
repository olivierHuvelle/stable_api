import { body } from 'express-validator'
import { ArrayUtils } from '@/utils/ArrayUtils'
import i18next from '../../../i18n'

export class HorseContributorHorseContributorJobValidator {
	static addJobs() {
		return [
			body('horseContributorId')
				.exists()
				.withMessage(
					i18next.t('horseContributorHorseContributorJob_request_validation_horseContributorId_exists')
				)
				.isInt({ min: 1 })
				.withMessage(
					i18next.t('horseContributorHorseContributorJob_request_validation_horseContributorId_isInt')
				),
			body('horseContributorJobIds')
				.exists()
				.withMessage(
					i18next.t('horseContributorHorseContributorJob_request_validation_horseContributorJobIds_exists')
				)
				.custom(horseContributorJobIds =>
					ArrayUtils.validateFkArray(
						horseContributorJobIds,
						'horseContributorHorseContributorJob_request_validation_horseContributorJobIds_isArray',
						'horseContributorHorseContributorJob_request_validation_horseContributorJobIds_isPositiveInteger',
						'horseContributorHorseContributorJob_request_validation_horseContributorJobIds_isPositiveInteger'
					)
				),
		]
	}

	static removeJobs() {
		return [
			body('horseContributorHorseContributorJobIds')
				.exists()
				.withMessage(
					'horseContributorHorseContributorJob_request_validation_horseContributorHorseContributorJobIds_exists'
				)
				.custom(horseContributorHorseContributorJobIds =>
					ArrayUtils.validateFkArray(
						horseContributorHorseContributorJobIds,
						'horseContributorHorseContributorJob_request_validation_horseContributorHorseContributorJobIds_isArray',
						'horseContributorHorseContributorJob_request_validation_horseContributorHorseContributorJobIds_PositiveInteger',
						'horseContributorHorseContributorJob_request_validation_horseContributorHorseContributorJobIds_PositiveInteger'
					)
				),
		]
	}
}
