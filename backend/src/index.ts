import dotenv from 'dotenv'
dotenv.config()
import config from 'config'
import express, { Application } from 'express'
import connectToDb from './utils/connectToDb'
import log from './utils/logger'
import router from './presentation/router'
import deserializeUser from './utils/middleware/deserializeUser'
import cors from 'cors'

const app: Application = express()
const BOOK_SERVICE_PORT = config.get('bookServicePort')
const CART_SERVICE_PORT = config.get('cartServicePort')
const AUTH_SERVICE_PORT = config.get('authServicePort')
const PAYMENT_SERVICE_PORT = config.get('paymentServicePort')

app.use(express.json())
app.use(cors())
app.use(deserializeUser)
app.use(router)

const startApp = async () => {
  try {
    await connectToDb()

    app.listen(AUTH_SERVICE_PORT, () => {
      log.info(`Server is running on port ${AUTH_SERVICE_PORT}`)
    })

    app.listen(BOOK_SERVICE_PORT, () => {
      log.info(`Server is running on port ${BOOK_SERVICE_PORT}`)
    })

    app.listen(CART_SERVICE_PORT, () => {
      log.info(`Server is running on port ${CART_SERVICE_PORT}`)
    })

    app.listen(PAYMENT_SERVICE_PORT, () => {
      log.info(`Server is running on port ${PAYMENT_SERVICE_PORT}`)
    })
  } catch (error) {
    console.error('Error starting the app:', error)
  }
}

startApp()
