import Category from '../../models/category'

export const AllCategories = async (req, res) => {
    try {
        return await Category.find()
                             .select(['-photo'])
                             .then((categories) => res.send(categories))
                             .catch((err) => res.send(err)) 
    } catch (err) {
        return await res.status(400).json({
            error: 'Could not return all categories, there was an error.'
        })
    }
}