import {
  createUserHandler,
  getCurrentUserHandler,
} from '../controller/user.controller'
import express from 'express'
import validateResource from '../middleware/validateResource'
import { createUserSchema } from '../schema/user.schema'
import requireUser from 'middleware/requireUser'

const router = express.Router()

router.post('/register', validateResource(createUserSchema), createUserHandler)
router.get('/loadUser', requireUser, getCurrentUserHandler)

export default router
