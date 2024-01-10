import { Request, Response } from 'express'
import { uploadCloudinary } from '../utils/cloudinary'
import { FileSchema } from '../models/fileSchema'
import { CategoryFileSchema } from '../models/categoryUploadSchema'
import { IFiles } from 'interfaces'

const uploads = {
  createCategory: async (req: Request, res: Response): Promise<any> => {
    const reqBody: IFiles = req.body
    try {
      if (reqBody && req.method === 'POST') {
        const fileData = req.body.files.map((e: any) => {
          return {
            subCategory: e.subCategory,
            fileDetails: e.fileDetails.map((e: any) => {
              return {
                fileName: e.fileName,
                fileLink: e.fileLink,
                folderName: e.folderName,
                format: e.format,
              }
            }),
          }
        })

        const createFile = await CategoryFileSchema.create({
          category: reqBody.category,
          files: fileData,
        })
        res.status(201).send({ success: true, message: 'Files Uploaded Successfully', data: createFile })
      }
    } catch (error) {
      res.status(500).send({ success: false, message: 'Internal Server Error', error })
    }
  },

  // eslint-disable-next-line no-unused-vars
  getAllCategoryFiles: async (_req: Request, res: Response): Promise<any> => {
    try {
      const getAllFiles = await CategoryFileSchema.find()
      res.status(200).send({ success: true, message: 'Fetch All Files', data: getAllFiles })
    } catch (error) {
      res.status(500).send({ success: false, message: 'Internal Server Error', error })
    }
  },

  uploadFiles: async (req: Request, res: Response): Promise<any> => {
    const imageBody: any = req.files
    try {
      if (!imageBody) {
        return res.status(400).send({ success: false, message: 'No file uploaded. Please Select File' })
      }

      if (req.method === 'POST') {
        const files = imageBody
        const data = []

        for (const file of files) {
          const { path } = file
          const res = await uploadCloudinary(path, 'images')
          // const { original_filename, folder, secure_url, format } = res
          const createResDB = await FileSchema.create({
            fileName: res.original_filename,
            folderName: res.folder,
            fileLink: res.secure_url,
            format: res.format,
          })

          data.push(createResDB)
        }

        res.send({
          success: true,
          // message: 'File Uploaded Successfully',
          data: data,
        })
      }
    } catch (error) {
      res.status(500).send({ success: false, message: 'Internal Server Error', error })
    }
  },

  // eslint-disable-next-line no-unused-vars
  getFiles: async (_req: Request, res: Response): Promise<any> => {
    try {
      const getAllData = await FileSchema.find()
      res.status(200).send({ success: true, message: 'Fetch All Files', data: getAllData })
    } catch (error) {
      res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
  },

  deleteFile: async (req: Request, res: Response): Promise<any> => {
    const reqId = req.params.id
    try {
      const fileToDelete = await FileSchema.findById(reqId)

      if (!fileToDelete) {
        return res.status(404).send({ success: false, message: 'File not found' })
      }

      const deletionResult = await FileSchema.deleteOne({ _id: reqId })

      if (deletionResult.deletedCount === 1) {
        return res.status(200).send({ success: true, message: 'File deleted successfully' })
      } else {
        return res.status(500).send({ success: false, message: 'Failed to delete file' })
      }
    } catch (error) {
      res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
  },
}

export default uploads
