import { Order } from '../../models/order'
import { errorHandler } from '../../helper/dbErrorHandler'

export const listOrders =  (req, res) => {
    Order.find()
    .populate("user", "_id firstName lastName address")
    .sort('-created')
    .exec((err, orders) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(orders)
    })
}