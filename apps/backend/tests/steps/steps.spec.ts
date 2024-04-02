import StepService from '#services/step/step_service'
import { test } from '@japa/runner'
import { STEP_IDENTIFIERS, StepIdentifier, StepName } from 'steps'

type MockedStepData = {
  answer: string
  stepName: StepName
  nextStepIdentifier: StepIdentifier
}

let mockedStepsData: MockedStepData[]
let stepsService: StepService

test.group('steps checking', (group) => {
  group.setup(() => {
    stepsService = new StepService()
    mockedStepsData = [
      { stepName: 'One', answer: 'ADA LOVELACE', nextStepIdentifier: STEP_IDENTIFIERS.Two },
      {
        stepName: 'Two',
        answer: 'ADA LOVELACE',
        nextStepIdentifier: STEP_IDENTIFIERS.Three,
      },
      {
        stepName: 'Three',
        answer: 'BGP',
        nextStepIdentifier: STEP_IDENTIFIERS.Four,
      },
    ]
  })

  test('should pass and send next step id upon a correct answer')
    .with(() => mockedStepsData)
    .run(({ assert }, row) => {
      const checkResponse = stepsService.checkStepN(row.stepName, row.answer)

      assert.isTrue(checkResponse.isCorrect)
      assert.isTrue(checkResponse.message.includes(row.nextStepIdentifier))
    })

  test('should fail upon a wrong answer, and not communicate next step id')
    .with(() => mockedStepsData)
    .run(({ assert }, row) => {
      const answer = 'WRONG'
      const checkResponse = stepsService.checkStepN(row.stepName, answer)

      assert.isFalse(checkResponse.isCorrect)
      assert.isFalse(checkResponse.message.includes(row.nextStepIdentifier))
    })
})
