const { Order } = require('../../models/order')
const { errorHandler } = require ('../../helper/dbErrorHandler')

exports.updateOrderStatus =  (req, res) => {
   Order.update({ _id: req.body.orderId}, {$set: {status: req.body.status}}, (err, order) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(order)
   })
}