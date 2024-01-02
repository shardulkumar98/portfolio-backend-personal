import { Response, Request, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const token = req.header('accessToken')
    if (!token) {
      return res.status(401).json({
        error: true,
        message: 'token is required for authentication',
      })
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY || ' ')
    req.body.decode = decode
    next()
  } catch (error: any) {
    return res.status(500).send({ error: true, message: error.message })
  }
}

export default verifyToken
