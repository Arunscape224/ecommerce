const express = require('express')
const { Read, categoryById } = require('../controllers/category/categoryById')
const { Delete } = require('../controllers/category/deleteCategory')
const { AllCategories } = require('../controllers/category/allCategories')
const { Create } = require('../controllers/category/createCategory')
const { Update } = require('../controllers/category/updateCategory')
const { isAdmin } = require('../controllers/auth/isAdmin')
const { isAuth } = require('../controllers/auth/isAuth')
const { requireLogin } = require('../controllers/auth/requireLogin')
const { userById } = require('../controllers/user/userById')

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

module.exports = router