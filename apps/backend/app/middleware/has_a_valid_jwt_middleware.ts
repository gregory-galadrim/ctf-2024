import { HttpContext, errors } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'
import jwt from 'jsonwebtoken'

export default class HasAValidJwtMiddleware {
  async handle({ request }: HttpContext, next: NextFn) {
    /**
     * Ensure the auth header exists
     */
    const authHeader = request.header('authorization')
    if (!authHeader) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access')
    }

    /**
     * Split the header value and read the token from it
     */
    const [, token] = authHeader.split('Bearer ')
    if (!token) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access')
    }

    /**
     * Verify token
     */
    const payload = jwt.verify(token, this.#options.secret)
    if (typeof payload !== 'object' || !('userId' in payload)) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    return next()
  }
}
