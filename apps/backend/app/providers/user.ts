import User from '#models/user'
import { createUserFromEmail } from '#services/galadrim/auth'
import env from '#start/env'
import { symbols } from '@adonisjs/auth'
import { HttpContext, errors } from '@adonisjs/core/http'
import crypto from 'node:crypto'
import { GuardUser, UserProviderContract } from '../auth/guards/galadrim_cookie.js'

const ALGORITHM = 'aes-256-cbc'

export const galadrimEncrypt = (data: string) => {
  const secretKey = env.get('GALADRIM_TOOLS_SECRET_KEY')

  if (!secretKey) return null

  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    crypto.createHash('sha256').update(secretKey).digest(),
    iv
  )
  const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()])

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

export const galadrimDecrypt = (encryptedData: string): string | null => {
  const secretKey = env.get('GALADRIM_TOOLS_SECRET_KEY')

  if (!secretKey) return null

  const [ivHex, dataHex] = encryptedData.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const encrypted = Buffer.from(dataHex, 'hex')

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    crypto.createHash('sha256').update(secretKey).digest(),
    iv
  )
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])

  return decrypted.toString('utf8')
}

const getUserEmailFromGaladrimCookie = async ({ request }: HttpContext) => {
  const emailCookie: string | null = request.cookiesList()['email-token']

  if (!emailCookie) return null
  try {
    const email = galadrimDecrypt(emailCookie)

    return email
  } catch (error) {
    return null
  }
}

export class UserProvider implements UserProviderContract<User> {
  declare [symbols.PROVIDER_REAL_USER]: User

  private buildGuardUser(user: User | null) {
    if (!user) {
      return null
    }
    return {
      getId() {
        return user.id
      },
      getOriginal() {
        return user
      },
    }
  }
  createUserForGuard(user: User): Promise<GuardUser<User>> {
    const guardUser = this.buildGuardUser(user)

    if (!guardUser) {
      throw errors.E_HTTP_EXCEPTION
    }

    return Promise.resolve(guardUser)
  }

  async findByEmail(email: string): Promise<GuardUser<User> | null> {
    const user = await User.findBy('email', email)

    return this.buildGuardUser(user)
  }

  async getUserToAuthenticate(ctx: HttpContext) {
    const email = await getUserEmailFromGaladrimCookie(ctx)

    if (!email) return null

    const user = (await User.findBy('email', email)) || (await createUserFromEmail(email))

    return this.buildGuardUser(user)
  }
}
