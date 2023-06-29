const processPayment = async (): Promise<number> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(200)
    }, 2000)
  })
}

const paymentService = {
  processPayment,
}

export default paymentService
