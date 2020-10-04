import { Order } from '../../models/order'
import { errorHandler } from '../../helper/dbErrorHandler'

export const updateOrderStatus =  (req, res) => {
    console.log("HOLY FUCKING SHIT")
   Order.update({ _id: req.body.orderId}, {$set: {status: req.body.status}}, (err, order) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(order)
   })
}