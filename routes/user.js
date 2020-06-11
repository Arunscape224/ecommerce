import { Signup, Login } from '../controllers/user'
import express from 'express'
import {signupValidator} from '../validation'
const router = express.Router()

router.post('/signup', signupValidator, Signup)
router.post('/login', Login)

export default router