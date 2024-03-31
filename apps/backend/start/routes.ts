/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const StepsController = () => import('#controllers/steps_controller')
import { STEP_NAME_TO_STRINGS } from '#services/step/constants'
import router from '@adonisjs/core/services/router'
import { STEP_IDENTIFIERS, StepName, isStepName } from 'steps'
import { Middleware, middleware } from './kernel.js'

const stepMiddleWares: Partial<Record<StepName, Middleware>> = {
  Three: middleware.jwtParser({ secret: STEP_NAME_TO_STRINGS.Two.answer }),
}

Object.entries(STEP_IDENTIFIERS).forEach(([stepName, stepId]) => {
  if (isStepName(stepName)) {
    router.get(stepId, [StepsController, `get${stepName}`])
    const checkRoute = router.post(stepId, [StepsController, `check${stepName}`])

    const stepMiddleware = stepMiddleWares[stepName]

    if (!stepMiddleware) {
      return
    }

    checkRoute.use(stepMiddleware)
  }
})
