import mongoose, { Schema } from 'mongoose'

interface IUser {
  username: string
  email: string
  password: string
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

export const UserSchema = mongoose.model('User', userSchema)
