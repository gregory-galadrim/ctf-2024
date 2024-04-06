import { injectionDb } from '#services/database/injection'
import { errors } from '@adonisjs/core/http'
import { StepName } from 'steps'
import { STEP_NAME_TO_STRINGS, StepStrings } from './constants.js'
import { spawnSync } from 'node:child_process'

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

  async checkNodeInjectionStep(answer: string) {
    if (answer === STEP_NAME_TO_STRINGS['Five'].answer) {
      return {
        isCorrect: true,
        message: STEP_NAME_TO_STRINGS['Five'],
      }
    }

    if (answer.length > 256) {
      return {
        isCorrect: false,
        message: 'username too long',
      }
    }

    // T^T
    if (
      /while\s*\(1\)/.test(answer) ||
      /while\s*\(true\)/.test(answer) ||
      /for\s*\(.*;true;.*\)/.test(answer) ||
      /for\s*\(.*;1?;.*\)/.test(answer)
    ) {
      return {
        isCorrect: false,
        message: 'Merci de ne pas submit des boucles infinies.',
      }
    }

    const child = spawnSync('./utils/launch-docker.sh', [answer], { encoding: 'utf8' })
    if (child.error) {
      console.log('ERROR: ', child.error)
    }
    console.log('ERROR: ', child.stderr)
    console.log('STDOUT: ' + child.stdout)

    let stdout =
      child.stdout.replace(/(\w+) ALL=\(ALL:ALL\) ALL\n/, '') +
      (child.stderr?.replace(/chpasswd: password for '(\w+)' changed/, '') ?? '') +
      (child.error ?? '')

    stdout = stdout.trimEnd()

    return this.checkStepN('Four', child.stdout, { wrongAnswerMessage: JSON.stringify(stdout) })
  }
}
