// import type { HttpContext } from '@adonisjs/core/http'

import StepService from '#services/step/step_service'
import { checkStepValidator } from '#validators/step'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { StepName } from 'steps'

@inject()
export default class StepsController {
  constructor(protected stepsService: StepService) {}

  private async stepChecker(stepName: StepName, { request }: HttpContext) {
    const data = request.all()
    const { answer } = await checkStepValidator.validate(data)

    return this.stepsService.checkStepN(stepName, answer)
  }

  private async stepGetter(stepName: StepName) {
    return this.stepsService.getStepN(stepName)
  }

  async checkOne(ctx: HttpContext) {
    return this.stepChecker('One', ctx)
  }
  async getOne() {
    return this.stepGetter('One')
  }

  async checkTwo(ctx: HttpContext) {
    return this.stepChecker('Two', ctx)
  }
  async getTwo() {
    return this.stepGetter('Two')
  }

  async checkThree(ctx: HttpContext) {
    return this.stepChecker('Three', ctx)
  }
  async getThree() {
    return this.stepGetter('Three')
  }
}
