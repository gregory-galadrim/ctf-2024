// import type { HttpContext } from '@adonisjs/core/http'

import StepService from '#services/step_service'
import { checkStepValidator } from '#validators/step'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class StepsController {
  constructor(protected stepsService: StepService) {}

  async One({ request }: HttpContext) {
    const data = request.all()
    const { answer } = await checkStepValidator.validate(data)

    return this.stepsService.checkStepOne(answer)
  }

  async Two() {
    throw Error('Not implemented')
  }
}
