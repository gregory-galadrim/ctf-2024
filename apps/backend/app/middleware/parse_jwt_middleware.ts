import { errors } from '@adonisjs/auth'
import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

export default class ParseJwtMiddleware {
  async handle({ request, response }: HttpContext, next: NextFn, options: { secret: string }) {
    /**
     * Ensure the auth header exists
     */
    const authHeader = request.header('authorization')
    if (!authHeader) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', { guardDriverName: 'jwt' })
    }

    /**
     * Split the header value and read the token from it
     */
    const [, token] = authHeader.split('Bearer ')
    if (!token) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', { guardDriverName: 'jwt' })
    }

    /**
     * Verify token
     */
    try {
      const rawPayload = jwt.verify(token, options.secret)
      const payload = JwtPayloadSchema.parse(rawPayload)

      request.updateBody(payload)
    } catch (error) {
      response.status(401).send(error)
    }

    next()
  }
}

export const JwtPayloadSchema = z.object({
  answer: z.string(),
})
export type JwtPayload = z.infer<typeof JwtPayloadSchema>
