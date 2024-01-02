import express from 'express'
import user from '../controller/user'
import files from '../controller/upload-images'
import { upload } from '../middleware/multer'

const router = express.Router()

router.post('/login', user.UserLogin)
router.post('/sign-up', user.UserSignUp)
router.post('/upload', upload.array('image'), files.uploadFiles)

export default router
