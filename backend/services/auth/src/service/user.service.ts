import UserModel, { User } from '../model/user.model'

const createUser = (input: Partial<User>) => {
  return UserModel.create(input)
}

export function findUserById(id: string) {
  return UserModel.findById(id)
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email })
}

export default createUser
