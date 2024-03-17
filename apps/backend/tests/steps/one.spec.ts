import StepService from '#services/step_service'
import { test } from '@japa/runner'

test('should pass upon a correct answer', async ({ assert }) => {
  const stepsService = new StepService()

  assert.isTrue(stepsService.checkStepOne('ADA LOVELACE'))
})

test('should fail upon a wrong answer', async ({ assert }) => {
  const stepsService = new StepService()

  assert.isFalse(stepsService.checkStepOne('WRONG'))
})
