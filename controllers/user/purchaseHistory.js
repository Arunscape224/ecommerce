import {Order} from '../../models/order'
import { errorHandler } from '../../helper/dbErrorHandler'

export const PurchaseHistory =  (req, res) => {
    Order.find({user: req.profile._id})
    .populate('user', '_id firstName')
    .sort('-created')
    .exec((err, orders) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(orders)
    })
}
