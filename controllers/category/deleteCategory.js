import _ from 'lodash'
import Product from '../../models/product'

export const Delete = async (req, res) => {
    let category = await req.category

    if(category.products) {
            category.products.map((product) => {
            let filter = { "_id": product }
            let update = { "$pull": { "categories": category._id } }
            let useFindAndModifySetting = { useFindAndModify : false }
            Product.findOneAndUpdate(filter, update, useFindAndModifySetting, (err, data) => {
                if(err) {
                    console.log("there was an error")
                }
            })
        })
    }

    await category.remove(async (err, deletedCategory) => {
        try {
            await res.json({
                "message": `You just deleted ${deletedCategory.name}`
            })
        } catch(err) {
            return await res.status(400).json({
                error: errorHandler(err)
            })
        }
    })
}