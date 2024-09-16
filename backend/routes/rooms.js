import express from 'express'
import { verifyAdmin } from '../utils/verifyToken.js'
import { bookingCancel, createRoom, deleteRoom, getAllRooms, singleRoom, updateRoom, updateRoomAvailability, updateUser, userDates, userHotel, userHotelandCity } from '../controllers/room.js'

const router = express.Router()

// Create room
router.post('/:hotelId', verifyAdmin, createRoom)

// Update room
router.put('/:id', verifyAdmin, updateRoom)


// available rooms
router.put('/availability/:id', updateRoomAvailability)


// Delete room
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom)


// Get room
router.get('/:id', singleRoom)


// Get all rooms
router.get('/', getAllRooms)

// get user
router.put('/user/:id', updateUser)

// get user booked dates
router.get('/user/dates/:userid', userDates)

// get user booked hotel
router.get('/user/hotel/:userid', userHotel)

// get user booked hotel city
router.get('/user/hotelcity/:userid', userHotelandCity)

//cancellation of booking
router.get('/user/cancel/:userid/:roomnoid', bookingCancel)



export default router