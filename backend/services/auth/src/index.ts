import express, { Application } from 'express'
import mongoose from 'mongoose'

import router from './router'

const app: Application = express()
const PORT = 3003
const CONNECTION_STRING = 'mongodb://localhost:27017'

app.use(express.json())

mongoose.connect(CONNECTION_STRING)
.then(() => {
    console.log('Successfully connected to mongoDB')
})
.catch(error => {
    console.log('MongoDB connection error: ', error)
})

app.use('/', router());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})