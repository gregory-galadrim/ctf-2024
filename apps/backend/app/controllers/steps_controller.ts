// import type { HttpContext } from '@adonisjs/core/http'

import StepService from '#services/step/step_service'
import { checkStepValidator } from '#validators/step'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { StepName } from 'steps'

@inject()
export default class StepsController {
  constructor(protected stepsService: StepService) {}

  private async stepNChecker(stepName: StepName, { request }: HttpContext) {
    const data = request.all()
    const { answer } = await checkStepValidator.validate(data)

    return this.stepsService.checkStepN(stepName, answer)
  }

  private async stepNGetter(stepName: StepName) {
    return this.stepsService.getStepN(stepName)
  }

  async checkOne(ctx: HttpContext) {
    return this.stepNChecker('One', ctx)
  }
  async getOne() {
    return this.stepNGetter('One')
  }

  async checkTwo(ctx: HttpContext) {
    return this.stepNChecker('Two', ctx)
  }
  async getTwo() {
    return this.stepNGetter('Two')
  }

  async checkThree(ctx: HttpContext) {
    return this.stepNChecker('Three', ctx)
  }
  async getThree() {
    return this.stepNGetter('Three')
  }

  async checkFour(ctx: HttpContext) {
    const data = ctx.request.all()
    const { answer } = await checkStepValidator.validate(data)
    const result = await this.stepsService.checkInjectionStep(answer)

    return result
  }
  async getFour() {
    return this.stepNGetter('Four')
  }

  async checkFive(ctx: HttpContext) {
    const data = ctx.request.all()
    const { answer } = await checkStepValidator.validate(data)
    const result = await this.stepsService.checkNodeInjectionStep(answer)

    return result
  }
  async getFive() {
    return this.stepNGetter('Five')
  }
}
