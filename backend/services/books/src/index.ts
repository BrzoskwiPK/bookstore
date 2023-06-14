import express, { Application } from 'express'
import mongoose from 'mongoose'
import bookRoutes from './routes/bookRoutes'

const app: Application = express()
const PORT = 3001
const CONNECTION_STRING = 'mongodb://database:27017'

app.use(express.json())

mongoose.connect(CONNECTION_STRING)
.then(() => {
    console.log('Successfully connected to mongoDB')
})
.catch(error => {
    console.log('MongoDB connection error: ', error)
})

app.use('/', bookRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})