import expressJwt from 'express-jwt'
import dotenv from 'dotenv'
dotenv.config()

export const requireLogin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
 })