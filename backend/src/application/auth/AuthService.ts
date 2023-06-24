import {
  authRepository,
  validatePassword,
} from '../../adapters/mongodb/repositories/AuthRepository'
import User from '../../domain/auth/models/User'
import { DocumentType } from '@typegoose/typegoose'

const signUp = async (userData: Partial<User>): Promise<User> => {
  const user = await authRepository.createUser(userData)
  return user
}

const signIn = async (
  email: string,
  password: string,
): Promise<{ accessToken: string; refreshToken: string }> => {
  const user = await authRepository.findUserByEmail(email)

  if (!user) {
    throw new Error('Invalid email or password')
  }

  const userDoc: DocumentType<User> = user as DocumentType<User>

  const isPasswordValid = await validatePassword(userDoc, password)

  if (!isPasswordValid) {
    throw new Error('Invalid email or password')
  }

  const accessToken = authRepository.signAccessToken(userDoc)
  const refreshToken = await authRepository.signRefreshToken({
    userId: userDoc._id,
  })

  return { accessToken, refreshToken }
}

export default {
  signUp,
  signIn,
}
