import express, { Application } from 'express'
import mongoose from 'mongoose'
import cartRoutes from './routes/cartRoutes'

const app: Application = express()
const PORT = 3002
const CONNECTION_STRING = 'mongodb://database:27017'

app.use(express.json())

mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    console.log('Successfully connected to mongoDB')
  })
  .catch(error => {
    console.log('MongoDB connection error: ', error)
  })

app.use('/', cartRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
