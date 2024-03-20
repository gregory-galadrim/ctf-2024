import { StepName } from 'steps'
import { STEP_NAME_TO_STRINGS } from './constants.js'

export default class StepService {
  getStepN(stepName: StepName) {
    return { question: STEP_NAME_TO_STRINGS[stepName].question }
  }

  checkStepN(stepName: StepName, toCheck: string) {
    const isCorrect = toCheck.toLocaleUpperCase() === STEP_NAME_TO_STRINGS[stepName].answer
    const message = isCorrect
      ? STEP_NAME_TO_STRINGS[stepName].rightAnswerMessage
      : STEP_NAME_TO_STRINGS[stepName].wrongAnswerMessage
    return {
      isCorrect,
      message,
    }
  }
}
