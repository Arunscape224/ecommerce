import Category from '../models/category'
import { errorHandler } from '../helper/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'
import _ from 'lodash'

export const Create = async (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    await form.parse(req, async (err, fields, files) => {
         if(err) {
             return await res.status(400).json({
                 error: 'Image could not be uploaded'
             })
         }
         // if everythings all good we create a new category
         let category = new Category(fields)
         const { name } = fields
         if(!name) {
             return await res.status(400).json({
                 error: "Categories should atleast have a name."
             })
         }

         if(files.photo) {
             if(files.photo.size > 1000000) {
                return await res.status(400).json({
                    error: 'Image should be smaller than 1 mb.'
                })
             }
            category.photo.data = fs.readFileSync(files.photo.path)
            category.photo.contentType = await files.photo.type
         }
 
         category.save(async(error, result) => {
             if(error) {
                 return await res.status(400).json({
                     error: errorHandler(error)
                 })
             }
             await res.json(result)
         })
 
    })
 }