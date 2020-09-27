import express from 'express'
import { isAuth } from '../controllers/auth/isAuth'
import { requireLogin } from '../controllers/auth/requireLogin'
import { userById } from '../controllers/user/userById' 
import { addOrderToUserHistory } from '../controllers/user/addOrderToUserHistory' 
import { CreateOrder } from '../controllers/order/createOrder'

const router = express.Router()

router.post('/order/create/:userId', requireLogin, isAuth, addOrderToUserHistory, CreateOrder)

router.param("userId", userById)

export default router 