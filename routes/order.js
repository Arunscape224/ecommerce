const express = require('express')
const { isAuth } = require('../controllers/auth/isAuth')
const { isAdmin } = require('../controllers/auth/isAdmin')
const { requireLogin } = require('../controllers/auth/requireLogin')
const { userById } = require('../controllers/user/userById')
const { orderById } = require('../controllers/order/orderById')
const { addOrderToUserHistory } = require('../controllers/user/addOrderToUserHistory')
const { decreaseProductQuantity } = require('../controllers/product/decreaseProductQuantity')
const { CreateOrder } = require('../controllers/order/createOrder')
const { listOrders } = require('../controllers/order/listOrders')
const { getStatusValues } = require('../controllers/order/getStatusValues')
const { updateOrderStatus } = require('../controllers/order/updateOrderStatus')

const router = express.Router()

router.post('/order/create/:userId', requireLogin, isAuth, addOrderToUserHistory, decreaseProductQuantity, CreateOrder)
router.get('/order/list/:userId', requireLogin, isAuth, isAdmin , listOrders)
router.get('/order/status-values/:userId', requireLogin, isAuth, isAdmin , getStatusValues)
router.put('/order/:orderId/status/:userId', requireLogin, isAuth, isAdmin , updateOrderStatus)

router.param("userId", userById)
router.param("orderId", orderById)

module.exports = router 