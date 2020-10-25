const Product = require('../../models/product')

exports.ListRelated = async (req, res) => {
    let limit = await req.query.limit ? parseInt(req.query.limit) : 6
    let category = await req.query.category ? parseInt(req.query.category) : 0

    return await Product.find({ _id: { $ne: req.product }, categories: req.product.categories[category] })
                        .limit(limit)
                        .select(['-photo'])
                        .populate('categories', '_id name')
                        .exec((err, products) => {
                            if(err) {
                                return res.status(400).json({
                                    error:"products not found"
                                })
                            }
                            res.json(products)
                        })
}