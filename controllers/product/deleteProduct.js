import { errorHandler } from '../../helper/dbErrorHandler'

export const Delete = async (req, res) => {
    let product = await req.product
    
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