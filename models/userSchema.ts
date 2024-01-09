import mongoose, { Schema } from 'mongoose'
import { IUser } from 'interfaces'

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export const UserSchema = mongoose.model('User', userSchema)
