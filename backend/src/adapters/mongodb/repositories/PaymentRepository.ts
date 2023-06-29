import paymentService from '../../../application/payment/PaymentService'
import PaymentRepositoryInterface from '../../../interfaces/PaymentRepositoryInterface'

const PaymentRepository: PaymentRepositoryInterface = {
  processPayment: async () => paymentService.processPayment(),
}

export default PaymentRepository
