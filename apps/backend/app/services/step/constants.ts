import { STEP_IDENTIFIERS, StepName } from 'steps'

type StepStrings = {
  question: string
  answer: string
  wrongAnswerMessage: string
  rightAnswerMessage: string
}

export const STEP_NAME_TO_STRINGS: Record<StepName, StepStrings> = {
  One: {
    question: 'Quel est la personne considérée comme la première à avoir programmé ?',
    answer: 'ADA LOVELACE',
    wrongAnswerMessage: 'Mauvaise réponse',
    rightAnswerMessage: `Tu as trouvé le premier oeuf !\nIl me semble que le suivant a un lien avec "${STEP_IDENTIFIERS.Two}"`,
  },
  Two: {
    question: 'PyBDIGVnYWduYWwgZWwgw6l0bmV2bmkgYSBpdVE=',
    answer: 'ZWloY3RpUiBzaW5uZUQ=',
    wrongAnswerMessage: 'Mauvaise réponse',
    rightAnswerMessage: 'Bonne réponse !',
  },
}
