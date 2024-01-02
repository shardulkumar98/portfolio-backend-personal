import dotenv from 'dotenv'
import { logger } from './shared/logger'
import createServer from './app'
import mongoose from 'mongoose'

dotenv.config()
const port = process.env.PORT || 5001
const app = createServer()

if (process.env.MONGO_BASE_URL) {
  try {
    mongoose.set('strictQuery', false)
    mongoose
      .connect(process.env.MONGO_BASE_URL, {
        // useNewUrlParser: true,
        // useFindAndModify: false,
        // useUnifiedTopology: true,
      })
      .then(() => logger.info('mongo db connected successfully with server'))
      .catch((err) => logger.info(err))

    app.listen(port, (): void => {
      logger.info(`Connected successfully on port http://localhost:${port}`)
    })
  } catch (error) {
    logger.error(`Error occured: ${(error as any).message}`)
  }
}
