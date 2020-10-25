const {Order} = require('../../models/order')
const { errorHandler } = require('../../helper/dbErrorHandler')

exports.PurchaseHistory =  (req, res) => {
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
