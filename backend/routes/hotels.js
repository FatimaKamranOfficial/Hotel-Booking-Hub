import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotelRooms, hotelsByCity, hotelsByType, singleHotel, updateHotel } from '../controllers/hotel.js'
import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router()

// Create hotel
router.post('/', verifyAdmin, createHotel)

// Update hotel
router.put('/:id', verifyAdmin, updateHotel)


// Delete hotel
router.delete('/:id', verifyAdmin, deleteHotel)


// Get hotel
router.get('/find/:id', singleHotel)


// Get all hotels
router.get('/', getAllHotels)


// get the number of hotels in each city
router.get('/countByCity', countByCity)

// get number of hotels by type
router.get('/countByType', countByType)

// get hotel rooms
router.get('/room/:id', getHotelRooms)

// get hotels by city
router.get('/city', hotelsByCity)

// get hotels by type
router.get('/type', hotelsByType)





export default router


