const { Order } = require('../../models/order')

exports.CreateOrder =  (req, res) => {
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save((error, data) => {
        if(error) {
            return res.status(400).json({
                error: "order not created"
            })
        }
        res.json(data)
    })
}