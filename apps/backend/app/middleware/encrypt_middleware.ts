import { checkStepValidator } from '#validators/step'
import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'
import { z } from 'zod'

export const encrypt = (input: string) => btoa(input.split('').reverse().join(''))
export const decrypt = (input: string) => atob(input).split('').reverse().join('')

export default class EncryptMiddleware {
  async handleGet({ response }: HttpContext, next: NextFn) {
    await next()

    const res = GetResponstContentSchema.parse(response.content?.[0])
    return {
      question: encrypt(res.question),
    }
  }

  async handlePost({ request, response }: HttpContext, next: NextFn) {
    const data = request.all()
    const { answer } = await checkStepValidator.validate(data)

    try {
      request.updateBody({ answer: decrypt(answer) })
    } catch (error) {
      response.status(402).send({ isCorrect: false, message: 'Malformed answer' })
    }

    await next()

    const res = CheckResponseContentSchema.parse(response.content?.[0])
    return {
      ...res,
      message: encrypt(res.message),
    }
  }
  /*
   *  Encrypt the response by reversing the string and encoding the result in base64
   */
  async handle(ctx: HttpContext, next: NextFn) {
    const { request, response } = ctx
    let encryptedResponse

    if (request.method() === 'GET') {
      encryptedResponse = await this.handleGet(ctx, next)
    }
    if (request.method() === 'POST') {
      encryptedResponse = await this.handlePost(ctx, next)
    }

    response.send(encryptedResponse)
  }
}

const CheckResponseContentSchema = z.object({
  isCorrect: z.boolean(),
  message: z.string(),
})

const GetResponstContentSchema = z.object({
  question: z.string(),
})
