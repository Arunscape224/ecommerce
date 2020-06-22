export const Delete = async (req, res) => {
    let category = await req.category
    
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