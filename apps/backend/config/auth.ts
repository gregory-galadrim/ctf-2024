import { defineConfig } from '@adonisjs/auth'
import { Authenticators, InferAuthEvents } from '@adonisjs/auth/types'
import { GaladrimGuard } from '../app/auth/guards/galadrim_cookie.js'
import { UserProvider } from '../app/providers/user.js'

const authConfig = defineConfig({
  default: 'galadrim',
  guards: {
    galadrim: (ctx) => {
      return new GaladrimGuard(ctx, new UserProvider())
    },
  },
})

export default authConfig

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module '@adonisjs/auth/types' {
  interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
