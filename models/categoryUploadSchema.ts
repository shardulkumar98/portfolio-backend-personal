// import { IFiles } from 'interfaces'
// import { Schema, model } from 'mongoose'

// const fileSchema = new Schema({
//   subCategory: {
//     type: String,
//     required: [true, 'SubCategory is required.'],
//   },
//   fileDetails: {
//     fileName: {
//       type: String,
//       required: [true, 'FileName is required.'],
//     },
//     fileLink: {
//       type: String,
//       required: [true, 'FileLink is required.'],
//     },
//     folderName: {
//       type: String,
//       required: [true, 'FolderName is required.'],
//     },
//     format: {
//       type: String,
//       required: [true, 'Format is required.'],
//     },
//   },
// })

// const categoryUploadSchema = new Schema<IFiles>({
//   category: {
//     type: Object,
//     enum: ['image', 'video'],
//     required: true,
//   },
//   files: { fileSchema, type: Array, required: true },
// })

// export const CategoryFileSchema = model('CategoryUpload', categoryUploadSchema)

// import { IFiles } from 'interfaces'
import { Schema, model, Document } from 'mongoose'

// Define the file details schema
const fileDetailsSchema = new Schema({
  fileName: {
    type: String,
    required: [true, 'FileName is required.'],
  },
  fileLink: {
    type: String,
    required: [true, 'FileLink is required.'],
  },
  folderName: {
    type: String,
    required: [true, 'FolderName is required.'],
  },
  format: {
    type: String,
    required: [true, 'Format is required.'],
  },
})

// Define the file schema
const fileSchema = new Schema({
  subCategory: {
    type: String,
    required: [true, 'SubCategory is required.'],
  },
  fileDetails: {
    type: [fileDetailsSchema],
    required: [true, 'Files are required.'],
  },
})

// Define the category upload schema
interface ICategoryUpload extends Document {
  images: [
    {
      category: 'image' | 'video'
      files: {
        subCategory: string
        fileDetails: {
          fileName: string
          fileLink: string
          folderName: string
          format: string
        }
      }
    },
  ]
}

const categoryUploadSchema = new Schema<ICategoryUpload>({
  images: [
    {
      category: {
        type: String,
        enum: ['image', 'video'],
        required: [true, 'Category is required.'],
      },
      files: {
        type: [fileSchema],
        required: [true, 'Files are required.'],
      },
    },
  ],
})

export const CategoryFileSchema = model<ICategoryUpload>('CategoryUpload', categoryUploadSchema)
