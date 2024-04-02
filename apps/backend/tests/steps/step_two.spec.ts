import { encrypt } from '#middleware/encrypt_middleware'
import { test } from '@japa/runner'
import { STEP_IDENTIFIERS } from 'steps'

test.group('Step two', () => {
  test('should not pass upon a wrong answer', async ({ client }) => {
    const response = await client.post(`/${STEP_IDENTIFIERS.Two}`).json({
      answer: encrypt('Wrong'),
    })

    response.assertBodyContains({
      isCorrect: false,
    })
  })

  test('should pass upon a right answer', async ({ client }) => {
    const response = await client.post(`/${STEP_IDENTIFIERS.Two}`).json({
      answer: encrypt('ADA LOVELACE'),
    })

    response.assertBodyContains({
      isCorrect: true,
    })
  })

  test('should alert on a malformed base64 encryption', async ({ client }) => {
    const response = await client.post(`/${STEP_IDENTIFIERS.Two}`).json({
      answer: 'malformed',
    })

    response.assertBodyContains({
      isCorrect: false,
      message: encrypt('Malformed answer'),
    })
  })
})
