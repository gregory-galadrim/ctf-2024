import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

export default class DoNothingMiddleware {
  async handle(_ctx: HttpContext, next: NextFn) {
    next()
  }
}
