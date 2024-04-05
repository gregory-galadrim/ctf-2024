import env from '#start/env'
import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'
import crypto from 'node:crypto'

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

export default class DoNothingMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const cookies = ctx.request.cookiesList()

    const emailToken: string = cookies['email-token']

    if (!emailToken) {
      ctx.response.status(401).send({ error: 'emailToken' })
    }
    console.log(galadrimDecrypt(emailToken))
    return next()
  }
}
