const User = require('../modules/user')
const jwt = require('jsonwebtoken')
const user = require('../modules/user')



const checkuser = (req, res, next) => {
    const token = req.cookies.token
    if (token) {
        jwt.verify(token, 'mk', async(err, decodedToken) => {
            let user = await User.findById(decodedToken._id)
                // console.log("Email " + user.Email)
            res.locals.id = user._id
            res.locals.admin = user.admin
            res.locals.user = user.Email
            next()
        })

    } else {
        res.locals.user = null
        next()
    }

}

module.exports = { checkuser }