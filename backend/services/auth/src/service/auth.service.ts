import { DocumentType } from '@typegoose/typegoose'
import SessionModel from '../model/session.model'
import { User, privateFields } from '../model/user.model'
import { signJwt } from '../utils/jwt'
import { omit } from 'lodash'

export const signAccessToken = (user: DocumentType<User>) => {
  const payload = omit(user.toJSON(), privateFields)

  const accessToken = signJwt(payload, 'accessTokenPrivateKey', {
    expiresIn: '15m',
  })

  return accessToken
}

export const signRefreshToken = async ({ userId }: { userId: any }) => {
  const session = await createSession({
    userId,
  })

  const refreshToken = signJwt(
    {
      session: session._id,
    },
    'refreshTokenPrivateKey',
    {
      expiresIn: '1y',
    },
  )

  return refreshToken
}

export const createSession = async ({ userId }: { userId: any }) => {
  return SessionModel.create({ user: userId })
}

export const findSessionById = async (id: string) => {
  return SessionModel.findById(id)
}