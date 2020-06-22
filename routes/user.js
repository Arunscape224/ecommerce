import express from 'express'
import { isAdmin } from '../controllers/auth/isAdmin'
import { requireLogin } from '../controllers/auth/requireLogin'
import { isAuth } from '../controllers/auth/isAuth'
import { userById } from '../controllers/user/userById' 
import {  AllUsers } from '../controllers/user/allUsers'

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



router.param('userId', userById)

export default router