import mongoose from 'mongoose'
import log from './logger'
import config from 'config'

const connectToDb = async () => {
  try {
    const dbUri = config.get<string>('dbUri')
    await mongoose.connect(dbUri)
    log.info('Connected to database')
  } catch (error) {
    process.exit(1)
  }
}

export default connectToDb
