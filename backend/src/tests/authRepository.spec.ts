import assert from 'assert'
import bcrypt from 'bcrypt'
import sinon from 'sinon'
import {
  authRepository,
  IUserDocument,
  UserModel,
} from '../adapters/mongodb/repositories/AuthRepository'
import { Document, ObjectId } from 'mongoose'

describe('authRepository', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('createUser', () => {
    it('should create a new user with hashed password', async () => {
      const userData = [
        {
          username: 'john_doe',
          email: 'john.doe@example.com',
          password: 'password123',
          role: 'standard',
        },
      ]

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(userData[0].password, salt)

      const createStub = sinon.stub(UserModel, 'create').resolves([
        {
          ...userData[0],
          password: hashedPassword,
        } as IUserDocument &
          Document<any, {}, IUserDocument> & { _id: ObjectId },
      ])

      const result = await authRepository.createUser(userData[0])

      assert.ok(createStub.calledOnce, 'UserModel.create should be called once')
      assert.deepStrictEqual(result, [
        {
          ...userData[0],
          password: hashedPassword,
        },
      ])

      createStub.restore()
    })
  })

  describe('findUserById', () => {
    it('should find a user by ID', async () => {
      const userId = 'abc123'
      const user = {
        _id: userId,
        username: 'john_doe',
        email: 'john.doe@example.com',
        password: 'hashedPassword',
        role: 'standard',
      } as IUserDocument

      const findByIdStub = sinon.stub(UserModel, 'findById').resolves(user)

      const result = await authRepository.findUserById(userId)

      assert.ok(
        findByIdStub.calledOnceWith(userId),
        'UserModel.findById should be called with the correct ID',
      )
      assert.deepStrictEqual(result, user)

      findByIdStub.restore()
    })
  })
})
