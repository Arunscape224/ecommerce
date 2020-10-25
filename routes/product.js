const express = require('express')
const { productById, Read } = require('../controllers/product/productById')
const { AllProducts } = require('../controllers/product/allProducts')
const { ListBySearch } = require('../controllers/product/listBySearch')
const { Photo } = require('../controllers/product/photo')
const { InstallShot } = require('../controllers/product/install_shot')
const { ListRelated } = require('../controllers/product/listRelated')
const { Delete } = require('../controllers/product/deleteProduct')
const { Create } = require('../controllers/product/createProduct')
const { Update } = require('../controllers/product/updateProduct')
const { isAdmin } = require('../controllers/auth/isAdmin')
const { isAuth } = require('../controllers/auth/isAuth')
const { requireLogin } = require('../controllers/auth/requireLogin')
const { userById } = require('../controllers/user/userById')

const router = express.Router()

router.post('/product/create/:userId', 
        requireLogin, 
        isAuth, 
        isAdmin, 
        Create
)

router.post('/products/by/search', 
        ListBySearch
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

router.get('/products/related/:productId', ListRelated)

router.get('/product/photo/:productId', Photo)
router.get('/product/installshot/:productId', InstallShot)

router.get('/products', AllProducts)




router.param('userId', userById)
router.param('productId', productById)

module.exports = router