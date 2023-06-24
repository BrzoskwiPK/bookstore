import { Schema, Document, Model, model, Types } from 'mongoose'
import User from '../../../domain/auth/models/User'
import AuthRepositoryInterface from '../../../interfaces/AuthRepositoryInterface'
import { signJwt } from '../../../utils/jwt'
import { omit } from 'lodash'
import { DocumentType } from '@typegoose/typegoose'
import bcrypt from 'bcrypt'

interface IUserDocument extends User, Document {}
interface ISessionDocument extends Document {
  user: Schema.Types.ObjectId
  valid: boolean
}

const userSchema: Schema<IUserDocument> = new Schema<IUserDocument>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'standard' },
  },
  {
    timestamps: true,
  },
)

const sessionSchema: Schema<ISessionDocument> = new Schema<ISessionDocument>(
  {
    _id: { type: Schema.Types.ObjectId, default: new Types.ObjectId() },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
)

export const UserModel: Model<IUserDocument> = model<IUserDocument>(
  'User',
  userSchema,
)

export const SessionModel: Model<IUserDocument> = model<IUserDocument>(
  'Session',
  sessionSchema,
)

const createUser = async (userData: Partial<User>): Promise<User> => {
  const { password, ...data } = userData

  const salt = await bcrypt.genSalt(10)

  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await UserModel.create({
    ...data,
    password: hashedPassword,
  })

  return user
}

const findUserById = async (id: string): Promise<User | null> => {
  const user = await UserModel.findById(id).exec()
  return user
}

const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await UserModel.findOne({ email }).exec()
  return user
}

const createSession = async ({ userId }: { userId: string }) => {
  const session = await SessionModel.create({ user: userId })
  return session
}

export const findSessionById = async (id: string) => {
  const session = await SessionModel.findById(id)
  return session
}

export const signAccessToken = (user: DocumentType<User>) => {
  const payload = omit(user.toJSON(), ['password', '__v', 'role'])

  const accessToken = signJwt(payload, 'accessTokenPrivateKey', {
    expiresIn: '15m',
  })

  return accessToken
}

export const validatePassword = async (
  user: DocumentType<User>,
  candidatePassword: string,
) => {
  try {
    return await bcrypt.compare(candidatePassword, user.password)
  } catch (error) {
    return false
  }
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
      expiresIn: '30m',
    },
  )

  return refreshToken
}

export const authRepository: AuthRepositoryInterface = {
  createUser,
  findUserById,
  findUserByEmail,
  createSession,
  findSessionById,
  signAccessToken,
  signRefreshToken,
  validatePassword,
}
