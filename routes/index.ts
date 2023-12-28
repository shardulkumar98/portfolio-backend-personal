import express from 'express'
import user from '../controller/user'

const router = express.Router()

router.post('/login', user.UserLogin)
router.post('/sign-up', user.UserSignUp)

export default router
