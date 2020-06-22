import Category from '../../models/category'
import { errorHandler } from '../../helper/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'

export const Create = async (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, async (err, fields, files) => {
        
        if(err) {
            return await res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
         
        let category = await new Category(fields)
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