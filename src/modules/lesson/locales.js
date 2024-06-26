export const lessonLocales = {
	fr: {
		// errors
		lesson_404: 'Leçon trouvable',
		lesson_unauthorized: "Vous n'avez pas les permissions requises pour cette leçon",
		lesson_422_inexisting_client: "Le client renseigné n'existe pas",
		lesson_422_inexisting_creator: "Le créateur n'existe pas",
		lesson_422_update_completed:
			'Impossible de modifier une leçon lorsque cette dernière est annulée ou complétée ou notée comme absente',
		lesson_422_creatorId_change: "Impossible de changer le créateur d'une leçon",
		lesson_422_clientId_change: "Impossible de changer le client d'une leçon",
		lesson_422_status_change:
			"Impossible de changer le status d'une leçon quand cette dernière est annulée ou complétée ou notée comme absente",

		// validation (sql)
		lesson_sql_validation_creatorId_isInt: 'Vous devez renseigner un créateur valide',
		lesson_sql_validation_creatorId_min: 'Vous devez renseigner un créateur valide',
		lesson_sql_validation_clientId_isInt: 'Vous devez renseigner un client valide',
		lesson_sql_validation_clientId_min: 'Vous devez renseigner un client valide',
		lesson_sql_validation_startingAt_isAfterNow: 'La leçon ne peut commencer avant maintenant',
		lesson_sql_validation_endingAt_isAfterStartingAt:
			'La fin de la leçon ne peut être antérieure au debut de cette dernière',

		// validation (request)
		// query parameters
		lesson_request_validation_query_creatorId_isInt: 'Vous devez renseigner un créateur valide',
		lesson_request_validation_query_clientId_isInt: 'Vous devez renseigner un client valide',
		lesson_request_validation_query_startingAt_isDate: 'Vous devez renseigner une date de début valide',
		lesson_requests_validation_query_status_isIn: 'Vous devez renseigner un status valide',

		//body parameters
		lesson_request_validation_clientId_exists: 'Vous devez renseigner un client',
		lesson_request_validation_clientId_isInt: 'Vous devez renseigner un client valide',
		lesson_request_validation_startingAt_exists: 'Vous devez renseigner une date de début',
		lesson_request_validation_startingAt_isDate:
			'Vous devez renseigner une date de début au format ISO YYYY-MM-DDTHH:MM:SSZ',
		lesson_request_validation_endingAt_exists: 'Vous devez renseigner une date de fin',
		lesson_request_validation_endingAt_isDate:
			'Vous devez renseigner une date de fin au format ISO YYYY-MM-DDTHH:MM:SSZ',
		lesson_request_validation_endingAt_isAfterStartingAt:
			'La date de fin ne peut pas être antérieure à la date de début',
		lesson_request_validation_status_exists: 'Vous devez renseigner le status de la leçon',
		lesson_request_validation_query_status_isIn: 'Vous devez renseigner un status existant pour la leçon',
	},
	en: {},
	nl: {},
}
