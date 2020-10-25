const Product = require('../../models/product')

exports.decreaseProductQuantity = (req, res, next) => {
  let bulkOps = req.body.order.products.map((item) => {
      return {
          updateOne: {
              filter: { _id: item },
              update: { $inc: { quantity: -item.count, howManySold: +item.count } }
          }
      }
  })

  Product.bulkWrite(bulkOps, {}, (error, products) => {
      if(error) {
          return res.status(400).json({
              error: "could not update product"
          })
      }
      next()
  })
}