import { get } from 'lodash'
import { verifyJwt } from '../jwt'
import { Request, Response } from 'express'
import { authRepository } from '../../adapters/mongodb/repositories/AuthRepository'
import User from '../../domain/auth/models/User'
import { DocumentType } from '@typegoose/typegoose'

const refreshAccessToken = async (req: Request, res: Response) => {
  const refreshToken = (get(req.body, 'refresh') as string) || ''

  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    'refreshTokenPublicKey',
  )

  if (!decoded) return res.status(401).send('Could not refresh access token')

  const session = await authRepository.findSessionById(decoded.session)

  if (!session || !session.valid)
    return res.status(401).send('Could not refresh access token')

  const user = await authRepository.findUserById(session.user._id.toString())

  if (!user) return res.status(401).send('Could not refresh access token')
  
  const userDoc = user as DocumentType<User>

  const accessToken = authRepository.signAccessToken(userDoc)

  return res.send({ accessToken })
}

export default refreshAccessToken
