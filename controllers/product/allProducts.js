import Product from '../../models/product'

export const AllProducts = async(req, res) => {

    let order = await req.query.order ? req.query.order : 'asc';
    let sortBy = await req.query.sortBy ? req.query.sortBy : '_id';
    let limit = await req.query.limit ? req.query.limit : 6;

        Product.find()
               .select(['-photo'])
               .sort([[sortBy, order]])
               .limit(limit)
               .exec(async (err, data) => {
                    try {
                        await res.send(data)
                    } catch(err) {
                        return await res.status(400).json({
                            error: 'Could not return all categories, there was an error.'
                        })
                    }
               }) 
}