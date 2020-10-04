import { Order } from '../../models/order'
import { errorHandler } from '../../helper/dbErrorHandler'

export const orderById = (req, res, next, id) => {
    console.log(Order)
    Order.findById(id)
    .populate('products.product', 'name price')
    .exec((err, order) => {
        console.log("HOLY FUCK")
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