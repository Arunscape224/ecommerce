// @ts-nocheck
import User from '../models/user' 
import {errorHandler} from '../helper/dbErrorHandler'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'

export const Signup = (req, res) => {
   
   const user = new User(req.body)
   user.save((err, user) => {
      if(err) {
         return res.status(400).json({
            err: errorHandler(err)
         })
      }
      
      user.salt = undefined
      user.hashed_password = undefined
      res.json({
         user
      })
   })
}


export const Login = (req, res) => {
   // find user from email
   const { email, password } = req.body
   User.findOne({email}, (err, user) => {
      if(err || !user) {
         return res.status(400).json({
            error: 'User with that email does not exist '
         })
      }

      if(!user.authenticate(password)) {
         return res.status(401).json({
            error: 'Email and password don\'t match'
         })
      }

      const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
      // store token in cookie and set to expire 
      res.cookie('access_token', token, { expire: new Date() + 9999})
      const { _id, firstName, lastName, email, bio, admin } = user
      return res.json({token, user: { _id, email, firstName, lastName, bio, admin }})
   })
}

