import express from 'express'
import { isAuth } from '../controllers/auth/isAuth'
import { isAdmin } from '../controllers/auth/isAdmin'
import { requireLogin } from '../controllers/auth/requireLogin'
import { userById } from '../controllers/user/userById' 
import { orderById } from '../controllers/order/orderById' 
import { addOrderToUserHistory } from '../controllers/user/addOrderToUserHistory' 
import { decreaseProductQuantity } from '../controllers/product/decreaseProductQuantity' 
import { CreateOrder } from '../controllers/order/createOrder'
import { listOrders } from '../controllers/order/listOrders'
import { getStatusValues } from '../controllers/order/getStatusValues'
import { updateOrderStatus } from '../controllers/order/updateOrderStatus'

const router = express.Router()

router.post('/order/create/:userId', requireLogin, isAuth, addOrderToUserHistory, decreaseProductQuantity, CreateOrder)
router.get('/order/list/:userId', requireLogin, isAuth, isAdmin , listOrders)
router.get('/order/status-values/:userId', requireLogin, isAuth, isAdmin , getStatusValues)
router.put('/order/:orderId/status/:userId', requireLogin, isAuth, isAdmin , updateOrderStatus)

router.param("userId", userById)
router.param("orderId", orderById)

export default router 