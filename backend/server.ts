import express from "express"
import "colors"
import * as dotenv from "dotenv"
import { errorHandler } from "./middleware/errorMiddleware.js"
import connectDB from "./config/db.js"
import goalRouter from "./routes/goalRoutes.js"
import userRouter from "./routes/userRoutes.js"

dotenv.config()
const port = process.env.PORT || 5000
connectDB()
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/goals', goalRouter)
app.use('/api/users', userRouter)

app.use(errorHandler)

app.listen(port, () => console.log(`Server listening on port ${port}`))
