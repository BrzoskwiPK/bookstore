interface PaymentRepositoryInterface {
  processPayment(): Promise<number>
}

export default PaymentRepositoryInterface
