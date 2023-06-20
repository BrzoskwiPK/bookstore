import { Request, Response } from 'express'
import { CreateSessionInput } from '../schema/auth.schema'
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from '../service/auth.service'
import { findUserByEmail, findUserById } from '../service/user.service'
import { get } from 'lodash'
import { verifyJwt } from '../utils/jwt'

export const createSessionHandler = async (
  req: Request<{}, {}, CreateSessionInput>,
  res: Response,
) => {
  const message = 'Invalid email or password'
  const { email, password } = req.body

  const user = await findUserByEmail(email)

  if (!user) return res.send(message)

  const isValid = await user.validatePassword(password)

  if (!isValid) return res.send(message)

  const accessToken = signAccessToken(user)
  const refreshToken = await signRefreshToken({ userId: user._id })

  return res.send({
    accessToken,
    refreshToken,
  })
}

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response,
) => {
  const refreshToken = (get(req, 'headers.x-refresh') as string) || ''

  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    'refreshTokenPublicKey',
  )

  if (!decoded) return res.status(401).send('Could not refresh access token')

  const session = await findSessionById(decoded.session)

  if (!session || !session.valid)
    return res.status(401).send('Could not refresh access token')

  const user = await findUserById(String(session.user))

  if (!user) return res.status(401).send('Could not refresh access token')

  const accessToken = signAccessToken(user)

  return res.send({ accessToken })
}
