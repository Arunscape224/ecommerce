import express from 'express'
import { Read, categoryById } from '../controllers/category/categoryById'
import { Delete } from '../controllers/category/deleteCategory'
import { AllCategories } from '../controllers/category/allCategories'
import { Create } from '../controllers/category/createCategory'
import { Update } from '../controllers/category/updateCategory'
import { isAdmin } from '../controllers/auth/isAdmin'
import { isAuth } from '../controllers/auth/isAuth'
import { requireLogin } from '../controllers/auth/requireLogin'
import { userById } from '../controllers/user/userById' 

const router = express.Router()

router.post('/category/create/:userId', 
        requireLogin, 
        isAuth, 
        isAdmin, 
        Create
)

router.delete('/category/delete/:categoryId/:userId', 
        requireLogin, 
        isAuth, 
        isAdmin, 
        Delete
)

router.put('/category/update/:categoryId/:userId', 
        requireLogin, 
        isAuth, 
        isAdmin, 
        Update
)

router.get('/category/:categoryId', Read)

router.get('/categories/all', AllCategories)



router.param('userId', userById)
router.param('categoryId', categoryById)

export default router