const Product = require('../../models/product')

exports.productById = async (req, res, next, id) => {
    return await Product.findById(id).exec((err, product) => {
        try {
            req.product = product
            next()
        } catch(err) {
            if(!product) {
                return "No Product Found"
            }   
        }
    })
}

exports.Read = async (req, res) => {
    req.product.photo = undefined
    return await res.json(req.product)
}