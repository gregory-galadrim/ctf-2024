import { STEP_IDENTIFIERS } from 'steps'

export default class StepService {
  private STEP_ONE_ANSWER = 'ADA LOVELACE'

  checkStepOne(toCheck: string) {
    const isCorrect = toCheck.toLocaleUpperCase() === this.STEP_ONE_ANSWER
    const message = isCorrect
      ? `Tu as trouvé le premier oeuf !\nIl me semble que le suivant a un lien avec "${STEP_IDENTIFIERS.Two}"`
      : 'Mauvaise réponse'
    return {
      isCorrect,
      message,
    }
  }
}
