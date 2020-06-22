import express from 'express'
import { productById, Read } from '../controllers/product/productById'
import { AllProducts} from '../controllers/product/allProducts'
import { Delete } from '../controllers/product/deleteProduct'
import { Create } from '../controllers/product/createProduct'
import { Update } from '../controllers/product/updateProduct'
import { isAdmin } from '../controllers/auth/isAdmin'
import { isAuth } from '../controllers/auth/isAuth'
import { requireLogin } from '../controllers/auth/requireLogin'
import { userById } from '../controllers/user/userById' 

const router = express.Router()

router.post('/product/create/:userId', 
        requireLogin, 
        isAuth, 
        isAdmin, 
        Create
)

router.delete('/product/delete/:productId/:userId', 
        requireLogin, 
        isAuth, 
        isAdmin, 
        Delete
)

router.put('/product/update/:productId/:userId', 
        requireLogin, 
        isAuth, 
        isAdmin, 
        Update
)

router.get('/product/:productId', Read)

router.get('/products/all', AllProducts)



router.param('userId', userById)
router.param('productId', productById)

export default router