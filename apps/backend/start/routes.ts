/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const StepsController = () => import('#controllers/steps_controller')
import router from '@adonisjs/core/services/router'
import { STEP_IDENTIFIERS, isStepName } from 'steps'

Object.entries(STEP_IDENTIFIERS).forEach(([stepName, stepId]) => {
  if (isStepName(stepName)) {
    router.post(stepId, [StepsController, `check${stepName}`])
    router.get(stepId, [StepsController, `get${stepName}`])
  }
})
