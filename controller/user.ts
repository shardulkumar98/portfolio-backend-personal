import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserSchema } from '../models/userSchema'
import { IUser } from 'interfaces'

const Users = {
  UserSignUp: async (req: Request, res: Response): Promise<void> => {
    const userBody: IUser = req.body
    try {
      const existingUser = await UserSchema.findOne({ email: userBody.email })

      if (!existingUser) {
        const hashPassword = await bcrypt.hash(userBody.password, 10)
        const newUser = await UserSchema.create({
          username: userBody.username,
          firstName: userBody.firstName,
          lastName: userBody.lastName,
          email: userBody.email,
          password: hashPassword,
        })

        res.status(201).send({ success: true, message: 'User created successfully', data: newUser })
      } else {
        res.status(200).send({ success: false, message: 'User already exists.' })
      }
    } catch (error: any) {
      res.status(500).send({ success: false, message: 'Internal server error', error: error.message })
    }
  },

  UserLogin: async (req: Request, res: Response): Promise<any> => {
    const userBody: IUser = req.body
    try {
      const findUser = await UserSchema.findOne({
        email: userBody.email,
      })

      if (findUser) {
        const checkAuth = await bcrypt.compare(userBody.password, findUser.password)
        if (!checkAuth) {
          res.status(401).send({ success: false, message: 'Invalid Credentials' })
        } else {
          const generateToken = jwt.sign({ email: userBody.email }, `${process.env.SECRET_KEY}`, {
            expiresIn: '1d',
          })

          res.status(200).send({
            success: true,
            message: 'Logged In Successfully!',
            data: { userInfo: findUser, token: generateToken },
          })
        }
      } else {
        res.status(404).send({ success: false, message: 'User Not Found' })
      }
    } catch (error) {
      res.status(500).send({ success: false, message: error })
    }
  },
}

export default Users
