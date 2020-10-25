const _ = require('lodash')

exports.isAdmin = async (req, res, next) => {
      if(req.profile.admin === false) {
         return await res.status(403).json({
            error: 'admin resource. 🙅‍♂️'
         })
      }
      await next()
}