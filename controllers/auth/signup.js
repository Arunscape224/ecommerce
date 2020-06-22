import { errorHandler } from '../../helper/dbErrorHandler'
import User from '../../models/user' 
import formidable from 'formidable'
import fs from 'fs'

export const Signup = async (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
 
    form.parse(req, async (err, fields, files) => {

        if(err) {
            return await res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
      
        const user = await new User(fields)
        
        if(files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path)
            user.photo.contentType = await files.photo.type
        }

        const { firstName, lastName, email, password } = fields
    
        if(!firstName || !lastName || !email || !password) {
                return await res.status(400).json({
                    error: 'All fields required'
            })
        }
    
        await user.save(async (error, user) => {
            try {
                user.salt = undefined
                user.hashed_password = undefined
                await res.json({ user })
            } catch {
                if(error) {
                    return await res.status(400).json({
                        error: errorHandler(error)
                    })
                }
            }
        })
 
    })
}
 