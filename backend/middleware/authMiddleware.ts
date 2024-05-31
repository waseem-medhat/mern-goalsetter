import jwt, { JwtPayload } from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

// Extend the Request type to include user
declare global {
    namespace Express {
        interface Request {
            user: {
                id: string;
            };
        }
    }
}

export const protect = asyncHandler(async (req, res, next) => {
    let token: string = ""
    let jwtSecret: string = process.env.JWT_SECRET || ""

    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer")) {
        try {
            token = authHeader.split(' ')[1]
            const decoded = jwt.verify(token, jwtSecret) as JwtPayload
            const fetchedUser = await User.findById(decoded.id).select('-password')
            if (fetchedUser) {
                req.user = {
                    id: fetchedUser.id
                }
            }
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Unauthorized!")
        }
    }

    if (token == "") {
        res.status(401)
        throw new Error("Unauthorized!")
    }
})
