import { Router } from 'express'
import isAuthenticated from '@/middlewares/is-authenticated'
import hasRoleCategory from '@/middlewares/has-role-category'
import validate from '@/middlewares/validate'
import { CompetitionController } from '@/modules/competition/controller'
import { CompetitionValidator } from '@/modules/competition/validation'

const competitionRouter = Router()
const controller = new CompetitionController()
const prefix = 'competitions'

competitionRouter.get(`/${prefix}`, isAuthenticated, validate(CompetitionValidator.index()), controller.index)
competitionRouter.get(`/${prefix}/:id`, isAuthenticated, controller.show)
competitionRouter.delete(`/${prefix}/:id`, isAuthenticated, hasRoleCategory(['ADMIN', 'EMPLOYEE']), controller.delete)

export default competitionRouter