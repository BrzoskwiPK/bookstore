import dotenv from 'dotenv'
dotenv.config()
import config from 'config'
import express, { Application } from 'express'
import connectToDb from './utils/connectToDb'
import log from './utils/logger'
import router from './routes'
import deserializeUser from './middleware/deserializeUser';


const app: Application = express()
const PORT = config.get('port')

app.use(express.json())
app.use(deserializeUser)
app.use(router)

app.listen(PORT, () => {
  log.info(`Server is running on port ${PORT}`)

  connectToDb()
})
