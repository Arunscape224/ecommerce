const expressJwt = require('express-jwt')
const dotenv = require('dotenv')
dotenv.config()

exports.requireLogin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
 })

