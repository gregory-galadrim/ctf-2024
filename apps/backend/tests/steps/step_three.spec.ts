import { test } from '@japa/runner'
import { STEP_IDENTIFIERS } from 'steps'

test.group('Step three', () => {
  test('should get unauthorized response when called without authorization header', async ({
    client,
  }) => {
    const response = await client.post(`/${STEP_IDENTIFIERS.Three}`)

    response.assertStatus(401)
  })

  test('should send status unauthorized when called with wrong jwt')
    .with(() => [malformedJwt, badlySignedJwt])
    .run(async ({ client }, row) => {
      const response = await client.post(`/${STEP_IDENTIFIERS.Three}`).headers({
        ...commonHeaders,
        Authorization: `Bearer ${row}`,
      })

      response.assertStatus(401)
    })

  test('wrong and right answer jwt')
    .with(() => [
      { token: rightAnswerJwt, isCorrectValue: true },
      { token: wrongAnswerJwt, isCorrectValue: false },
    ])
    .run(async ({ client, assert }, row) => {
      const callResponse = await client.post(`/${STEP_IDENTIFIERS.Three}`).headers({
        ...commonHeaders,
        Authorization: `Bearer ${row.token}`,
      })
      const responseText = callResponse.response.text

      callResponse.assertStatus(200)
      assert.isTrue(responseText.includes(`"isCorrect":${row.isCorrectValue}`))
    })
})

const commonHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}
const malformedJwt = 'MALFORMED'
const badlySignedJwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbnN3ZXIiOiJCR1AifQ.a_OoY95FQMRBiFhQd-QlYAG1cHbRsa3M9V7L582Zsgc'
const wrongAnswerJwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbnN3ZXIiOiJ3cm9uZyBhbnN3ZXIifQ.tr5DJFr96mWe6w4z9tqnWcRTSrm9iuoRO1v2IvhvfuY'
const rightAnswerJwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbnN3ZXIiOiJCR1AifQ.PjL6QeVUdehx1aHLcxZSFuPi6Iw46ZbN0-BlxovkpqU'
