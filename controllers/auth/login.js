const User = require('../../models/user')
const jwt = require('jsonwebtoken')

exports.Login = async (req, res) => {
    const { email, password } = req.body
    await User.findOne({ email }, async(err, user) => {
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
      const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
      // store token in cookie and set to expire 
      await res.cookie('access_token', token, { expire: new Date() + 9999 })
      const { _id, firstName, lastName, email, bio, admin, trade } = user
      return await res.json( { token, user: { 
                                       _id, 
                                       email, 
                                       firstName, 
                                       lastName,
                                       trade, 
                                       bio, 
                                       admin 
                                    }
                              })
      })
}