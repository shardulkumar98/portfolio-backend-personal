import express from 'express'
import user from '../controller/user'
import files from '../controller/upload-images'

const router = express.Router()

router.post('/login', user.UserLogin)
router.post('/sign-up', user.UserSignUp)
router.post('/upload', files.uploadFiles)

export default router
