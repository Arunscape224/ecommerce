const express = require('express')
const { Login } = require('../controllers/auth/login')
const { Signup } = require('../controllers/auth/signup')
const { Logout } = require('../controllers/auth/logout')
const router = express.Router()

router.post('/signup', Signup)

router.post('/login', Login)

router.get('/logout', Logout)

module.exports = router