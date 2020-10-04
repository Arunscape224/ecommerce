import { Order } from '../../models/order'

export const getStatusValues =  (req, res) => {
    res.json(Order.schema.path('status').enumValues)
}