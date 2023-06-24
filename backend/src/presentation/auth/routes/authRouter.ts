import express from 'express'
import AuthController from '../controllers/AuthController'
import requireUser from '../../../utils/middleware/requireUser'
import { getCurrentUser } from '../../../utils/middleware/getCurrentUser'
import refreshAccessToken from '../../../utils/middleware/refreshAccessToken'

const router = express.Router()

router.get('/loadUser', requireUser, getCurrentUser)
router.post('/register', AuthController.signUp)
router.post('/login', AuthController.signIn)
router.post('/refreshToken', refreshAccessToken)

export default router
