const Category = require('../../models/category')

exports.Read = async (req, res) => {
    req.category.photo = undefined
    return await res.json(req.category)
}

exports.categoryById = async (req, res, next, id) => {
    await Category.findById(id).exec(async (err, category) => {
        if(err || !category) {
            return await res.status(400).json({
                error: "Category not found."
            })
        }
        req.category = category
        await next()
    })
}