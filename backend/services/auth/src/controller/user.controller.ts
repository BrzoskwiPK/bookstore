import { Request, Response } from 'express'
import { CreateUserInput } from 'schema/user.schema'
import createUser from '../service/user.service'

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
) => {
  const body = req.body

  try {
    const user = await createUser(body)

    return res.send('User sucessfully created')
  } catch (error) {
    if (error.code === 11000)
      return res.status(409).send('Account already exists')

    return res.status(500).send(error)
  }
}

export const getCurrentUserHandler = async (req: Request, res: Response) => {
  return res.send(res.locals.user)
}
