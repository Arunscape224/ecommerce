const { Create } = require('../controllers/review/createReview')
const { requireLogin } = require('../controllers/auth/requireLogin')
const { AllReviews } = require('../controllers/review/allReviews.controller')

const express = require('express')
const router = express.Router()

router.post('/review/create/:userId', requireLogin, Create)
router.get('/product/reviews/:productId', AllReviews)


module.exports = router