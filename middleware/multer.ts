/* eslint-disable no-unused-vars */
import multer from 'multer'

const storage = multer.diskStorage({
  filename: function (_req: any, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  },
})

const fileFilter = (_req: any, file: any, cb: any) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'video/mp4'
  ) {
    cb(null, true)
  } else {
    cb({ message: 'Unsupported File Format' }, false)
  }
}

export const upload = multer({
  storage: storage,
  // limits: { fileSize: 10485760 }, //limits file size
  fileFilter: fileFilter,
})
