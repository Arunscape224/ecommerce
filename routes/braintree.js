import express from 'express'
import { isAuth } from '../controllers/auth/isAuth'
import { requireLogin } from '../controllers/auth/requireLogin'
import { userById } from '../controllers/user/userById' 
import { generateToken } from '../controllers/braintree/braintree'
import { processPayment } from '../controllers/braintree/processPayment'

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

export default router 