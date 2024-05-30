const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer")) {
        try {
            token = authHeader.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Unauthorized!")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("Unauthorized!")
    }
})

module.exports = { protect }
