import { symbols } from '@adonisjs/auth'
import { JwtGuardUser, JwtUserProviderContract } from '../auth/guards/jwt_step.js'

type DummyUser = { id: number }

export class DummyUserProvider implements JwtUserProviderContract<DummyUser> {
  #users = [{ id: 1 }] satisfies DummyUser[];

  declare [symbols.PROVIDER_REAL_USER]: DummyUser

  async createUserForGuard(user: DummyUser): Promise<JwtGuardUser<DummyUser>> {
    return {
      getId() {
        return user.id
      },
      getOriginal() {
        return user
      },
    }
  }

  async findById(identifier: string | number | BigInt): Promise<JwtGuardUser<DummyUser> | null> {
    const foundUser = this.#users.find((user) => user.id === identifier)

    if (!foundUser) {
      return null
    }
    return this.createUserForGuard(foundUser)
  }
}
