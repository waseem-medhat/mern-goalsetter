export function errorHandler(err, _req, res, _next) {
    const status = res.statusCode || 500
    res.status(status)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null
    })
}
