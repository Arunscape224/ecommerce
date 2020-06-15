import Product from '../models/product'
import { errorHandler } from '../helper/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'
import _ from 'lodash'

export const productById = async (req, res, next, id) => {
    await Product.findById(id).exec(async (err, product) => {
        if(err || !product) {
            return await res.status(400).json({
                error: "Product not found."
            })
        }

        req.product = product
        await next()
        
    })
}

export const read = async (req, res) => {
    req.product.photo = undefined
    return await res.json(req.product)
}

export const Create = async (req, res) => {
   let form = new formidable.IncomingForm()
   form.keepExtensions = true
   await form.parse(req, async (err, fields, files) => {
        if(err) {
            return await res.status(400).json({
                error: 'Image could not be uploaded.'
            })
        }
        // if everythings all good we create a new product
        let product = new Product(fields)
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
            product.photo.contentType = await files.photo.type
        }

        product.save(async (error, result) => {
            if(error) {
                return await res.status(400).json({
                    error: errorHandler(error)
                })
            }
            await res.json(result)
        })

   })
}