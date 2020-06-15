import User from '../models/user' 
import { errorHandler } from '../helper/dbErrorHandler'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import dotenv from 'dotenv'
import formidable from 'formidable'
import fs from 'fs'
import _ from 'lodash'
dotenv.config()

export const Signup = async (req, res) => {
   let form = new formidable.IncomingForm()
   form.keepExtensions = true


   await form.parse(req, async (err, fields, files) => {
      
      if(err) {
          return await res.status(400).json({
              error: 'Image could not be uploaded'
          })
      }
      // if everythings all good we create a new user
      const user = new User(fields)

      if(files.photo) {
         user.photo.data = fs.readFileSync(files.photo.path)
         user.photo.contentType = await files.photo.type
      }

      user.save(async(error, user) => {
          if(error) {
              return await res.status(400).json({
                  error: errorHandler(error)
              })
          }
          user.salt = undefined
          user.hashed_password = undefined
          await res.json({
             user
          })
      })

 })
}


export const Login = async (req, res) => {
   // find user from email
   const { email, password } = req.body
   await User.findOne({email}, async(err, user) => {
      if(err || !user) {
         return await res.status(400).json({
            error: 'User with that email does not exist '
         })
      }

      if(!user.authenticate(password)) {
         return await res.status(401).json({
            error: 'Email and password don\'t match'
         })
      }

      const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET)
      // store token in cookie and set to expire 
      await res.cookie('access_token', token, { expire: new Date() + 9999})
      const { _id, firstName, lastName, email, bio, admin } = user
      return await res.json({token, user: { _id, email, firstName, lastName, bio, admin }})
   })
}


export const Logout = async (req, res) => {
   await res.clearCookie('access-token')
   await res.json({ message: 'successfully logged out '})
}


export const requireLogin = expressJwt({
   secret: process.env.JWT_SECRET,
   userProperty: "auth"
})

export const isAuth = async (req, res, next) => {
   let user = req.profile && req.auth && req.profile._id == req.auth._id
      if(!user) {
         return await res.status(403).json({
            error: 'access denied! 🙅'
         })
      }
      await next()
}

export const isAdmin = async (req, res, next) => {
      if(req.profile.admin === false) {
         return await res.status(403).json({
            error: 'admin resource. 🙅‍♂️'
         })
      }
      await next()
}