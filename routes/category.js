import express from 'express'
import { Create } from '../controllers/category.js'
import { requireLogin, isAuth, isAdmin } from '../controllers/auth.js'
import { userById } from '../controllers/user' 

const router = express.Router()

router.post('/category/create/:userId', 
        requireLogin, 
        isAuth, 
        isAdmin, 
        Create
)

router.param('userId', userById)

export default router