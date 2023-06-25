import { Request, Response } from 'express'
import AuthService from '../../../application/auth/AuthService'

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password, firstName, lastName } = req.body

    const userData = { username, email, password, firstName, lastName }
    const user = await AuthService.signUp(userData)

    res.status(201).json({ user })
  } catch (error) {
    res.json({ error: error.message })
  }
}

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const { accessToken, refreshToken } = await AuthService.signIn(
      email,
      password,
    )

    res.json({ accessToken, refreshToken })
  } catch (error) {
    res.json({ error: error.message })
  }
}

export default { signUp, signIn }
