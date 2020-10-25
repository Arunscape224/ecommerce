const Review = require('../../models/review')

exports.AllReviews = async(req, res) => {

    let order = await req.query.order ? req.query.order : 'asc';
    let sortBy = await req.query.sortBy ? req.query.sortBy : '_id';
    let limit = await req.query.limit ? parseInt(req.query.limit) : 12;
    let product = req.params.productId
    
        Review.find({ productId: product })
            //    .select(['-photo'])
            // console.log(product)
               .sort([[sortBy, order]])
               .limit(limit)
               .exec(async (err, data) => {
                    try {
                        await res.send(data)
                    } catch(err) {
                        return await res.status(400).json({
                            error: 'Could not return all reviews, there was an error.'
                        })
                    }
               })
}