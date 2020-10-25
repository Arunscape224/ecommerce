const Category = require('../../models/category')
const Product = require('../../models/product')
const { errorHandler } = require('../../helper/dbErrorHandler')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')
const mongoose = require('mongoose')

exports.Create = async (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, async (err, fields, files) => {
       
        if(err) {
            return await res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
         
        let category = await new Category(fields)
        const { name, products } = category
        
        if(!name) {
            return await res.status(400).json({
                error: "Categories should atleast have a name."
            })
        }
        
        if(products) {
            if(_.every(products, _.isString)) {
                let converted = products.map((product) => mongoose.Types.ObjectId(product))
                category.products = converted
                category.products.map((product) => console.log(typeof product))
            }
            
            products.map((product) => {
                let filter = { "_id": product }
                let update = { "$push": { "categories": category._id } }
                let useFindAndModifySetting = { useFindAndModify : false }
                Product.findOneAndUpdate(filter, update, useFindAndModifySetting, (err, data) => {
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
            category.photo.data = fs.readFileSync(files.photo.path)
            category.photo.contentType = files.photo.type
        }

        await category.save(async (error, result) => {
            try {
                await res.json(result)
            } catch {
                return await res.status(400).json({
                    error: errorHandler(error)
                })
            } 
        })
 
    })
}