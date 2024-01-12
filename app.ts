import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './routes'

const createServer = (): express.Application => {
  const app: Application = express()

  // Body parsing Middleware
  app.use(express.json())
  app.use(cors())
  app.use(express.urlencoded({ extended: true }))
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

  app.use('/api', router)
  app.use(cookieParser())

  // eslint-disable-next-line no-unused-vars
  app.get('/', (_req, res) => {
    res.status(200).send('Hello World!')
  })

  return app
}

export default createServer
