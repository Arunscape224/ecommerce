const Review = require('../../models/review')
const { errorHandler } = require('../../helper/dbErrorHandler')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')

exports.Create = async (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, async (err, fields, files) => {
       
        if(err) {
            return await res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
         
        let review = await new Review(fields)

        const { subject, textBody } = review
        
        if(!subject || !textBody) {
            return await res.status(400).json({
                error: "Reviews should atleast have a subject and body."
            })
        }
        
        

        if(files.photo) {
            if(files.photo.size > 1000000) {
               return await res.status(400).json({
                   error: 'Image should be smaller than 1 mb.'
               })
            }
            review.photo.data = fs.readFileSync(files.photo.path)
            review.photo.contentType = files.photo.type
        }

        await review.save(async (error, result) => {
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