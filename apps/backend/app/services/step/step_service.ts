import { injectionDb } from '#services/database/injection'
import { errors } from '@adonisjs/core/http'
import { spawn } from 'node:child_process'
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

  async checkNodeInjectionStep(answer: string) {
    if (answer === STEP_NAME_TO_STRINGS['Five'].answer) {
      return {
        isCorrect: true,
        message: STEP_NAME_TO_STRINGS['Five'].rightAnswerMessage,
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

    const child = spawn('./utils/launch-docker.sh', [answer], {})
    let stdout = ''

    // Promisify the child process handling
    const childPromise = new Promise((resolve) => {
      child.stdout.on('data', (data) => {
        stdout += data
      })

      child.stderr.on('data', (data) => {
        stdout += data
      })

      child.on('close', () => {
        stdout =
          stdout
            .replace(/(\w+) ALL=\(ALL:ALL\) ALL\n/, '')
            .replace(/chpasswd: password for '(\w+)' changed/, '') ?? ''

        stdout = stdout.trimEnd()

        // Resolve the promise with the final result
        resolve({
          isCorrect: false,
          message: stdout,
        })
      })
    })

    // Wait for the child process to complete and return the final result
    return await childPromise
  }
}
