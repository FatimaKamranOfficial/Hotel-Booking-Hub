import Hotel from '../models/Hotel.js'
import Room from '../models/Room.js'
import User from '../models/User.js'


// create hotel
export const createHotel = async (req, res, next) => {

    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }

    catch (err) {
        next(err)
    }
}


// update hotel
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedHotel)
    }

    catch (err) {
        next(err)
    }
}

// delete hotel
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")

    }

    catch (err) {
        next(err)
    }
}

// get single hotel
export const singleHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    }

    catch (err) {
        next(err)
    }
}

// get all hotels
export const getAllHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query

    try {
        const hotels = await Hotel.find({ ...others, cheapestPrice: { $gt: min | 1, $lt: max || 20000 } }).limit(req.query.limit)
        res.status(200).json(hotels)
    }

    catch (err) {
        next(err)
    }
}


// get number of hotels by city
export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        res.status(200).json(list)
    }

    catch (err) {
        next(err)
    }
}

// get hotels by city name
export const hotelsByCity = async (req, res, next) => {
    const city = req.query.city
    try {

        const list = await Hotel.find({ city: city })


        res.status(200).json(list)

    }

    catch (err) {
        next(err)
    }
}


// get hotels by type
export const hotelsByType = async (req, res, next) => {
    const type = req.query.type
    try {

        const list = await Hotel.find({ type: type })
        res.status(200).json(list)
    }

    catch (err) {
        next(err)
    }
}

// get number of hotels by type
export const countByType = async (req, res, next) => {

    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const resortCount = await Hotel.countDocuments({ type: "resort" })
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" })
        const cabinCount = await Hotel.countDocuments({ type: "cabin" })
        const villaCount = await Hotel.countDocuments({ type: "villa" })

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "resort", count: resortCount },
            { type: "apartment", count: apartmentCount },
            { type: "cabin", count: cabinCount },
            { type: "villa", count: villaCount },
        ])
    }

    catch (err) {
        next(err)
    }
}

// get hotel rooms
export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room)
            })
        )

        res.status(200).json(list)
    }

    catch (err) {
        next(err)
    }

}
