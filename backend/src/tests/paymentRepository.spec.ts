import assert from 'assert'
import sinon from 'sinon'
import PaymentRepository from '../adapters/mongodb/repositories/PaymentRepository'
import paymentService from '../application/payment/PaymentService'

describe('PaymentRepository', () => {
  beforeEach(() => {
    sinon.restore()
  })

  describe('processPayment', () => {
    it('should call processPayment method of paymentService', async () => {
      const processPaymentStub = sinon
        .stub(paymentService, 'processPayment')
        .resolves(200)

      const result = await PaymentRepository.processPayment()

      assert.ok(
        processPaymentStub.calledOnce,
        'processPayment method of paymentService should be called once',
      )
      assert.strictEqual(result, 200)

      processPaymentStub.restore()
    })
  })
})
