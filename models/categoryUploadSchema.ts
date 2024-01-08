import { Schema, model } from 'mongoose'

const fileSchema = new Schema({
  subCategory: {
    type: String,
    required: true,
  },
  fileDetails: {
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
  },
})

const categoryUploadSchema = new Schema({
  category: {
    type: Object,
    enum: ['image', 'video'],
    required: true,
  },
  file: fileSchema,
})

export const CategoryFileSchema = model('CategoryUpload', categoryUploadSchema)
