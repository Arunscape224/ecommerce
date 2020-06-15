import { Signup, Logout, Login, requireLogin } from '../controllers/auth'
import express from 'express'
// my validator is using the req object, but signup uses form data. I need to change this. 
// import { signupValidator } from '../validation'
const router = express.Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.get('/logout', Logout)

export default router