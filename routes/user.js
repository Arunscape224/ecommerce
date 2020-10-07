import express from 'express'
import { isAdmin } from '../controllers/auth/isAdmin'
import { requireLogin } from '../controllers/auth/requireLogin'
import { isAuth } from '../controllers/auth/isAuth'
import { userById } from '../controllers/user/userById' 
import { ReadUser } from '../controllers/user/readUser' 
import { UpdateUser } from '../controllers/user/updateUser' 
import { AllUsers } from '../controllers/user/allUsers'
import { PurchaseHistory } from '../controllers/user/purchaseHistory'

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

export default router