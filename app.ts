import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
import router from './routes'

const createServer = (): express.Application => {
  const app: Application = express()

  // Body parsing Middleware
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/api', router)
  app.use(cookieParser())

  return app
}

export default createServer
