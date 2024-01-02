import mongoose, { Schema } from 'mongoose'

const fileSchema = new Schema({
  fileName: {
    type: String,
  },
  fileLink: {
    type: String,
    required: true,
  },
  folderName: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
})

export const FileSchema = mongoose.model('Files', fileSchema)
