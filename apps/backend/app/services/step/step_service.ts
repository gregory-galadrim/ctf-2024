import { injectionDb } from '#services/database/injection'
import { errors } from '@adonisjs/core/http'
import { StepName } from 'steps'
import { STEP_NAME_TO_STRINGS, StepStrings } from './constants.js'

export default class StepService {
  getStepN(stepName: StepName) {
    return { question: STEP_NAME_TO_STRINGS[stepName].question }
  }

  checkStepN(
    stepName: StepName,
    toCheck: string,
    stepStrings: Omit<Partial<StepStrings>, 'answer' | 'question'> = {}
  ) {
    const { wrongAnswerMessage, rightAnswerMessage } = stepStrings

    const isCorrect = toCheck === STEP_NAME_TO_STRINGS[stepName].answer
    const message = isCorrect
      ? rightAnswerMessage ?? STEP_NAME_TO_STRINGS[stepName].rightAnswerMessage
      : wrongAnswerMessage ?? STEP_NAME_TO_STRINGS[stepName].wrongAnswerMessage

    return {
      isCorrect,
      message,
    }
  }

  async checkInjectionStep(answer: string) {
    let res
    try {
      res = await injectionDb
        .rawQuery(`SELECT e.name FROM eggs e WHERE e.value = '${answer}' LIMIT 1`)
        .exec()
    } catch (e) {
      return {
        isCorrect: false,
        message: 'Invalid SQL',
      }
    }

    const eggNameFromDb = res?.rows?.[0]?.name ?? ''

    if (typeof eggNameFromDb !== 'string') {
      throw errors.E_HTTP_EXCEPTION
    }

    return this.checkStepN('Four', eggNameFromDb, { wrongAnswerMessage: JSON.stringify(res) })
  }
}
