const { Order } = require('../../models/order')
const { errorHandler } = require('../../helper/dbErrorHandler')

exports.orderById = (req, res, next, id) => {
    console.log(Order)
    Order.findById(id)
    .populate('products.product', 'name price')
    .exec((err, order) => {
        console.log(req.order)
        if(err || !order) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
       
        req.order = order
        next()
    })
}