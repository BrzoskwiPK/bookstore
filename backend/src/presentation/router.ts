import { Router } from 'express'
import bookRouter from './books/routes/bookRouter'
import cartRouter from './cart/controllers/routes/cartRouter'
import authRouter from './auth/routes/authRouter'
import paymentRouter from './payment/routes/paymentRouter'

const router = Router()

router.use(authRouter)
router.use(bookRouter)
router.use(cartRouter)
router.use(paymentRouter)

export default router
