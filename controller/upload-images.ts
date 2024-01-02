import { Request, Response } from 'express'

const uploads = {
  uploadFiles: async (req: Request, res: Response): Promise<any> => {
    const imageBody = req.file
    try {
      console.log('fileBody :>> ', imageBody)
      res.send({ success: true, message: 'File Upload Successfully' })
    } catch (error) {
      res.status(500).send({ success: false, message: error || 'Internal Server Error' })
    }
  },
}

export default uploads
