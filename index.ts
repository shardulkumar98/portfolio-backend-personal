// import dotenv from 'dotenv'
// import serverless from 'serverless-http'
// import mongoose from 'mongoose'
// import { logger } from './shared/logger'
// import createServer from './app'

// dotenv.config()
// const port = process.env.PORT || 5001
// const app = createServer()

// if (process.env.MONGO_BASE_URL) {
//   try {
//     mongoose.set('strictQuery', false)
//     mongoose
//       .connect(process.env.MONGO_BASE_URL, {
//         // useNewUrlParser: true,
//         // useFindAndModify: false,
//         // useUnifiedTopology: true,
//       })
//       .then(() => logger.info('mongo db connected successfully with server'))
//       .catch((err) => logger.info(err))

//     app.listen(port, (): void => {
//       logger.info(`Connected successfully on port http://localhost:${port}`)
//     })
//   } catch (error) {
//     logger.error(`Error occured: ${(error as any).message}`)
//   }
// }

import dotenv from 'dotenv'
import serverless from 'serverless-http'
import mongoose from 'mongoose'
import { logger } from './shared/logger'
import createServer from './app'

dotenv.config()

const port = process.env.PORT || 5001
const app = createServer()

const connectToMongoDB = async () => {
  try {
    mongoose.set('strictQuery', false)

    await mongoose.connect(process.env.MONGO_BASE_URL || '', {
      // useNewUrlParser: true,
      // useFindAndModify: false,
      // useUnifiedTopology: true,
    })

    logger.info('MongoDB connected successfully with server')
  } catch (err: any) {
    logger.error(`Error connecting to MongoDB: ${err.message}`)
  }
}

const startServer = async () => {
  try {
    await connectToMongoDB()
    app.listen(port, () => {
      logger.info(`Connected successfully on port http://localhost:${port}`)
    })
  } catch (err: any) {
    logger.error(`Error starting server: ${err.message}`)
  }
}

if (process.env.MONGO_BASE_URL) {
  // Check if running in a serverless environment
  if (process.env.IS_SERVERLESS) {
    // Export the serverless handler
    module.exports.handler = serverless(app)
  } else {
    startServer()
  }
} else {
  logger.error('MONGO_BASE_URL is not defined in the environment variables.')
}
