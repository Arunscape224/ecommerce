const express = require('express')
const { isAuth } = require('../controllers/auth/isAuth')
const { requireLogin } = require('../controllers/auth/requireLogin')
const { userById } = require('../controllers/user/userById')
const { generateToken } = require('../controllers/braintree/braintree')
const { processPayment } = require('../controllers/braintree/processPayment')

const router = express.Router()

router.get("/braintree/getToken/:userId", 
requireLogin, 
isAuth, 
generateToken)

router.post("/braintree/payment/:userId", 
requireLogin, 
isAuth, 
processPayment)

router.param("userId", userById)

module.exports = router 