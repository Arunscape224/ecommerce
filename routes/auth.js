import express from 'express'
import { Login } from '../controllers/auth/login'
import { Signup } from '../controllers/auth/signup'
import { Logout } from '../controllers/auth/logout'
const router = express.Router()

router.post('/signup', Signup)

router.post('/login', Login)

router.get('/logout', Logout)

export default router