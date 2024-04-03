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
import { STEP_IDENTIFIERS, isStepName } from 'steps'
import { middleware } from './kernel.js'

const stepCheckMiddleWares = {
  One: middleware.doNothing(),
  Two: middleware.encrypt(),
  Three: middleware.jwtParser({ secret: STEP_NAME_TO_STRINGS.Two.answer }),
  Four: middleware.doNothing(),
  Five: middleware.doNothing(),
} as const

const stepGetMiddleWares = {
  One: middleware.doNothing(),
  Two: middleware.encrypt(),
  Three: middleware.doNothing(),
  Four: middleware.doNothing(),
  Five: middleware.doNothing(),
} as const

Object.entries(STEP_IDENTIFIERS).forEach(([stepName, stepId]) => {
  if (isStepName(stepName)) {
    router.get(stepId, [StepsController, `get${stepName}`]).use(stepGetMiddleWares[stepName])
    router.post(stepId, [StepsController, `check${stepName}`]).use(stepCheckMiddleWares[stepName])
  }
})
