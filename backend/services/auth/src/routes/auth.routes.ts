import {
  createSessionHandler,
  refreshAccessTokenHandler,
} from '../controller/auth.controller'
import express from 'express'
import validateResource from '../middleware/validateResource'
import { createSessionSchema } from '../schema/auth.schema'

const router = express.Router()

router.post(
  '/login',
  validateResource(createSessionSchema),
  createSessionHandler,
)

router.post('/refreshToken', refreshAccessTokenHandler)

export default router
