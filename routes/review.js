import { Create } from '../controllers/review/createReview'
import { requireLogin } from '../controllers/auth/requireLogin'
import { AllReviews } from '../controllers/review/allReviews.controller'

import express from 'express'
const router = express.Router()

router.post('/review/create/:userId', requireLogin, Create)
router.get('/product/reviews/:productId', AllReviews)


export default router