import Product from '../../models/product'
import Category from '../../models/category'
import formidable from 'formidable'
import fs from 'fs'
import _ from 'lodash'
import mongoose from 'mongoose'

export const Create = async (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    
    form.parse(req, async (err, fields, files) => {
        /*  
            this is because I can't 
            figure out how to send array as a 
            field with form-data.. 
        */
        let dummy_fields = { 
            name: 'Skyline',
            price: 20,
            quantity: 100,
            shipping: true,
            categories: ["5ef4ed950abed54f4e6a7510", "5ef4eda04bfb304f60c0f44d"]
        }

        if(err) {
            return await res.status(400).json({
                error: 'Image could not be uploaded.'
            })
        }

            let product = await new Product(dummy_fields)
            const { name, price, categories } = product
            
            if(!name || !price) {
                return await res.status(400).json({
                    error: 'Products atleast need a name and a price.'
                })
            }

            if(categories) {
                if(_.every(categories, _.isString)) {
                    let converted = categories.map((category) => mongoose.Types.ObjectId(category))
                    product.categories = converted
                    product.categories.map((category) => console.log(typeof category))
                }    
    
                categories.map((category) => {
                    let filter = { "_id": category }
                    let update = { "$push": { "products": product._id } }
                    let useFindAndModifySetting = { useFindAndModify : false }
                    Category.findOneAndUpdate(filter, update, useFindAndModifySetting, (err, data) => {
                        if(err) {
                            console.log("there was an error")
                        }
                    })
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
                try {
                    await res.json(result)
                } catch (error) {
                    if(error) {
                        return await res.status(400).json({
                            error: errorHandler(error)
                        })
                    }
                }
                
            })
    })
}