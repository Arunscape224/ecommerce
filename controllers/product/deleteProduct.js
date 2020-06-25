import { errorHandler } from '../../helper/dbErrorHandler'
import _ from 'lodash'
import Category from '../../models/category'

export const Delete = async (req, res) => {
    let product = await req.product
    
    if(product.categories) {
            product.categories.map((category) => {
            let filter = { "_id": category }
            let update = { "$pull": { "products": product._id } }
            let useFindAndModifySetting = { useFindAndModify : false }
            Category.findOneAndUpdate(filter, update, useFindAndModifySetting, (err, data) => {
                if(err) {
                    console.log("there was an error")
                }
            })
        })
    }

    await product.remove(async (err, deletedProduct) => {
        try {
            await res.json({
                "message": `You just deleted ${deletedProduct.name}`
            })
        } catch(err) {
            return await res.status(400).json({
                error: errorHandler(err)
            })
        }
    })
}