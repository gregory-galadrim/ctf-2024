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
    answer: 'RUlIQ1RJUiBTSU5ORUQ=',
    wrongAnswerMessage: 'Mauvaise réponse',
    rightAnswerMessage: `Tu as trouvé le deuxième oeuf !\nIl me semble que le suivant a un lien avec "${STEP_IDENTIFIERS.Three}"`,
  },
  Three: {
    question:
      'Quel type de routage est principalement utilisé entre les routeurs de différents opérateurs Internet de différents pays ?',
    answer: 'BGP',
    wrongAnswerMessage: 'Mauvaise réponse',
    rightAnswerMessage: `Tu as trouvé le troisième oeuf !\nIl me semble que le suivant a un lien avec "${STEP_IDENTIFIERS.Four}"`,
  },
  Four: {
    question: 'To do',
    answer: 'To do',
    wrongAnswerMessage: 'To do',
    rightAnswerMessage: 'To do',
  },
}
