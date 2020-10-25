const express = require('express')
const { isAdmin } = require('../controllers/auth/isAdmin')
const { requireLogin } = require('../controllers/auth/requireLogin')
const { isAuth } = require('../controllers/auth/isAuth')
const { userById } = require('../controllers/user/userById') 
const { ReadUser } = require('../controllers/user/readUser') 
const { UpdateUser } = require('../controllers/user/updateUser') 
const { AllUsers } = require('../controllers/user/allUsers')
const { PurchaseHistory } = require('../controllers/user/purchaseHistory')

const router = express.Router()

router.get('/secret/:userId', requireLogin, (req, res) => {
    res.json({
        user: req.profile
    })
})

router.get('/users/all/:userId', 
    requireLogin, 
    isAuth, 
    isAdmin, 
    AllUsers
)

router.get('/user/:userId', 
    requireLogin, 
    isAuth,
    ReadUser
)

// Front End Still Being Worked On
router.put('/user/:userId', 
    requireLogin, 
    isAuth,
    UpdateUser
)

router.get('/orders/by/user/:userId', 
    requireLogin, 
    isAuth,
    PurchaseHistory
)



router.param('userId', userById)

module.exports = router