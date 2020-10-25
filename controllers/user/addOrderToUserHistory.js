const User = require('../../models/user')


exports.addOrderToUserHistory = (req, res, next) => {
    let history = []

    req.body.order.products.forEach((item) => {
        history.push({
            _id: item._id,
            name: item.name,
            soldPer: item.soldPer,
            quantity: item.count,
            vendor: item.vendor,
            transaction_id: req.body.order.transaction_id,
            amount: req.body.order.amount
        })
    })
    User.findOneAndUpdate({ _id: req.profile._id}, {$push: {history: history}}, {new: true}, (err, data) => {
            if(err) {
                return res.status(400).json({
                    error: 'Could not update user purchase history'
                })
            }
            next()
        }
    )
}