import { DocumentType } from '@typegoose/typegoose'
import User from '../domain/auth/models/User'

interface AuthRepositoryInterface {
  createUser(input: Partial<User>): Promise<User>
  findUserById(id: string): Promise<User | null>
  findUserByEmail(email: string): Promise<User | null>
  signAccessToken(user: DocumentType<User>): string
  signRefreshToken({ userId }: { userId: any }): Promise<string>
  createSession({ userId }: { userId: any }): Promise<DocumentType<any>>
  findSessionById(id: string): Promise<DocumentType<any> | null>
  validatePassword(
    user: DocumentType<User>,
    candidatePassword: string,
  ): Promise<boolean>
}

export default AuthRepositoryInterface
