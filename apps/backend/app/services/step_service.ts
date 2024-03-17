export default class StepService {
  private STEP_ONE_ANSWER = 'ADA LOVELACE'

  checkStepOne(toCheck: string) {
    return toCheck === this.STEP_ONE_ANSWER
  }
}
