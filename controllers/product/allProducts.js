import Product from '../../models/product'

export const AllProducts = async(req, res) => {
    try {
        return Product.find()
                      .select(['-photo'])
                      .then((products) => res.send(products))
                      .catch((err) => res.send(err)) 
    } catch (err) {
        return await res.status(400).json({
            error: 'Could not return all products, there was an error.'
        })
    }
}