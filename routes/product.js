import express from 'express'
import { Create, productById, read } from '../controllers/product.js'
import { requireLogin, isAuth, isAdmin } from '../controllers/auth.js'
import { userById } from '../controllers/user' 

const router = express.Router()

router.post('/product/create/:userId', 
        requireLogin, 
        isAuth, 
        isAdmin, 
        Create
)

router.get('/product/:productId', read)

router.param('userId', userById)
router.param('productId', productById)

export default router