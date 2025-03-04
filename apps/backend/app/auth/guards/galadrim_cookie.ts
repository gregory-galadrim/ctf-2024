import { errors, symbols } from '@adonisjs/auth'
import { AuthClientResponse, GuardContract } from '@adonisjs/auth/types'
import { HttpContext } from '@adonisjs/core/http'

/**
 * The bridge between the User provider and the
 * Guard
 */
export type GuardUser<RealUser> = {
  /**
   * Returns the unique ID of the user
   */
  getId(): string | number | BigInt

  /**
   * Returns the original user object
   */
  getOriginal(): RealUser
}

/**
 * The interface for the UserProvider accepted by the
 * JWT guard.
 */
export interface UserProviderContract<RealUser> {
  /**
   * A property the guard implementation can use to infer
   * the data type of the actual user (aka RealUser)
   */
  [symbols.PROVIDER_REAL_USER]: RealUser

  /**
   * Create a user object that acts as an adapter between
   * the guard and real user value.
   */
  createUserForGuard(user: RealUser): Promise<GuardUser<RealUser>>

  /**
   * Find a user by their email.
   */
  findByEmail(email: string): Promise<GuardUser<RealUser> | null>

  getUserToAuthenticate(ctx: HttpContext): Promise<GuardUser<RealUser> | null>
}

export class GaladrimGuard<UserProvider extends UserProviderContract<unknown>>
  implements GuardContract<UserProvider[typeof symbols.PROVIDER_REAL_USER]>
{
  #ctx: HttpContext
  #userProvider: UserProvider

  constructor(ctx: HttpContext, userProvider: UserProvider) {
    this.#ctx = ctx
    this.#userProvider = userProvider
  }
  /**
   * A list of events and their types emitted by
   * the guard.
   */
  declare [symbols.GUARD_KNOWN_EVENTS]: {}

  /**
   * A unique name for the guard driver
   */
  driverName: 'galadrim' = 'galadrim'

  /**
   * A flag to know if the authentication was an attempt
   * during the current HTTP request
   */
  authenticationAttempted: boolean = false

  /**
   * A boolean to know if the current request has
   * been authenticated
   */
  isAuthenticated: boolean = false

  /**
   * Reference to the currently authenticated user
   */
  user?: UserProvider[typeof symbols.PROVIDER_REAL_USER]

  /**
   * Generate a JWT token for a given user.
   */
  async generate(_user: UserProvider[typeof symbols.PROVIDER_REAL_USER]) {}

  /**
   * Authenticate the current HTTP request and return
   * the user instance if there is a valid JWT token
   * or throw an exception
   */
  async authenticate(): Promise<UserProvider[typeof symbols.PROVIDER_REAL_USER]> {
    /**
     * Avoid re-authentication when it has been done already
     * for the given request
     */
    if (this.authenticationAttempted) {
      return this.getUserOrFail()
    }
    this.authenticationAttempted = true

    const providerUser = await this.#userProvider.getUserToAuthenticate(this.#ctx)

    if (!providerUser) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    this.user = providerUser.getOriginal()
    return this.getUserOrFail()
  }

  /**
   * Same as authenticate, but does not throw an exception
   */
  async check(): Promise<boolean> {
    try {
      await this.authenticate()
      return true
    } catch {
      return false
    }
  }

  /**
   * Returns the authenticated user or throws an error
   */
  getUserOrFail(): UserProvider[typeof symbols.PROVIDER_REAL_USER] {
    if (!this.user) {
      throw new errors.E_UNAUTHORIZED_ACCESS('Unauthorized access', {
        guardDriverName: this.driverName,
      })
    }

    return this.user
  }

  /**
   * This method is called by Japa during testing when "loginAs"
   * method is used to login the user.
   */
  async authenticateAsClient(
    _user: UserProvider[typeof symbols.PROVIDER_REAL_USER]
  ): Promise<AuthClientResponse> {
    return {}
  }
}
