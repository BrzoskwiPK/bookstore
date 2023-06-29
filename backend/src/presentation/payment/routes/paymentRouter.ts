import express from 'express'
import PaymentController from '../controllers/PaymentController'

const router = express.Router()

router.post('/payment', PaymentController.processPayment)

export default router
