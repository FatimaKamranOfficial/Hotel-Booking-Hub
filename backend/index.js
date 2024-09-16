import express, { json } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()


// Connecting application with mongo DB
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("mongo connected ")
    } catch (error) {
        throw error
    }
}


// Establishing automation connection if mongo DB is disabled
mongoose.connection.on("disconnected", () => {
    console.log("Mongo DB Disconnected")
})


// Checking if mongo DB is connected
mongoose.connection.on("connected", () => {
    console.log("Mongo DB connected")
})


// Middlewares

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)

// error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong, Try Again!"
    return res.status(errorStatus).json({
        success: false,
        ststus: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})



app.listen(5001, () => {
    connect()
    console.log("Backend connected successfully")
})


