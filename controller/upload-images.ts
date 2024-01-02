import { Request, Response } from 'express'
import { uploadCloudinary } from '../utils/cloudinary'
import { FileSchema } from '../models/fileSchema'

const uploads = {
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
          const createResDB = await FileSchema.create({
            fileName: res.original_filename,
            folderName: res.folder,
            fileLink: res.secure_url,
            format: res.format,
          })

          data.push(createResDB)
        }

        res.send({ success: true, message: 'File Uploaded Successfully', data: data })
      }
    } catch (error) {
      res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
  },
}

export default uploads
