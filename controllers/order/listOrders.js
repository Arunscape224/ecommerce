const { Order } = require('../../models/order')
const { errorHandler } = require('../../helper/dbErrorHandler')

exports.listOrders =  (req, res) => {
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