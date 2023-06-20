import { Request, Response } from 'express'
import { CreateUserInput } from 'schema/user.schema'
import createUser from '../service/user.service'
import { omit } from 'lodash'
import { privateFields } from '../model/user.model'

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
) => {
  const body = req.body

  try {
    const user = await createUser(body)

    return res.send(omit(user.toJSON(), privateFields))
  } catch (error) {
    if (error.code === 11000)
      return res.status(409).send('Account already exists')

    return res.status(500).send(error)
  }
}

export const getCurrentUserHandler = async (req: Request, res: Response) => {
  return res.send(res.locals.user)
}
