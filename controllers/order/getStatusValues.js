const { Order } = require('../../models/order')

exports.getStatusValues =  (req, res) => {
    res.json(Order.schema.path('status').enumValues)
}