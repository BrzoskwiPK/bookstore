import { Router } from 'express'
import bookRouter from './books/routes/bookRouter'
import cartRouter from './cart/controllers/routes/cartRouter'
import authRouter from './auth/routes/authRouter'

const router = Router()

router.use(authRouter)
router.use(bookRouter)
router.use(cartRouter)

export default router
