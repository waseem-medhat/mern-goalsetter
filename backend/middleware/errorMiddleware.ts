import { NextFunction, Request, Response } from "express"

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
    const status = res.statusCode || 500
    res.status(status)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null
    })
}
