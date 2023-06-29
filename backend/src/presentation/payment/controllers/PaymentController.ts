import { Request, Response } from 'express'
import PaymentRepository from '../../../adapters/mongodb/repositories/PaymentRepository'

const processPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const status = await PaymentRepository.processPayment()
    res.status(status).send('Payment processed successfully')
  } catch (error) {
    res.status(500).send('An error occurred while processing payment')
  }
}

const PaymentController = {
  processPayment,
}

export default PaymentController
