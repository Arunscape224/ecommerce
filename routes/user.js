import express from 'express'
const router = express.Router()

import { requireLogin } from '../controllers/auth'

import { userById } from '../controllers/user'

router.get('/secret/:userId', requireLogin, (req, res) => {
    res.json({
        user: req.profile
    })
})

router.param('userId', userById)

export default router