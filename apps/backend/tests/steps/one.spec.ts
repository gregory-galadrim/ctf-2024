import StepService from '#services/step/step_service'
import { test } from '@japa/runner'
import { STEP_IDENTIFIERS } from 'steps'

test('should pass and send next step id upon a correct answer', async ({ assert }) => {
  const stepsService = new StepService()
  const answer = 'ADA LOVELACE'
  const checkResponse = stepsService.checkStepN('One', answer)

  assert.isTrue(checkResponse.isCorrect)
  assert.isTrue(checkResponse.message.includes(STEP_IDENTIFIERS.Two))
})

test('should fail upon a wrong answer', async ({ assert }) => {
  const stepsService = new StepService()
  const answer = 'WRONG'
  const checkResponse = stepsService.checkStepN('One', answer)

  assert.isFalse(checkResponse.isCorrect)
  assert.isFalse(checkResponse.message.includes(STEP_IDENTIFIERS.Two))
})
