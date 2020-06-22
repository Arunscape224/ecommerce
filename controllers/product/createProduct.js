import Product from '../../models/product'
import formidable from 'formidable'
import fs from 'fs'

export const Create = async (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    
    form.parse(req, async (err, fields, files) => {
        
        if(err) {
            return await res.status(400).json({
                error: 'Image could not be uploaded.'
            })
        }

        try {
            let product = await new Product(fields)
            const { name, price } = fields
            
            if(!name || !price) {
                return await res.status(400).json({
                    error: 'Products atleast need a name and a price.'
                })
            }

            if(files.photo) {
                if(files.photo.size > 1000000) {
                    return await res.status(400).json({
                        error: 'Image should be smaller than 1 mb.'
                    })
                }
                
                product.photo.data = fs.readFileSync(files.photo.path)
                product.photo.contentType = files.photo.type
            }

            await product.save(async (error, result) => {
                if(error) {
                    return await res.status(400).json({
                        error: errorHandler(error)
                    })
                }
                await res.json(result)
            })
            
        } catch {
            return await res.status(400).json({
                error: 'Product could not be created.'
            })
        }

    })
}