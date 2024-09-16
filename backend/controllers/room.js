import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js"
import User from "../models/User.js"
import { createError } from '../utils/error.js'
import { ObjectId } from 'mongodb'


// create room
export const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        }
        catch (err) {
            next(err)
        }

        res.status(200).json(savedRoom)
    }

    catch (err) {
        next(err)
    }

}


// update room
export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedRoom)
    }

    catch (err) {
        next(err)
    }
}

// delete Room
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;

    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
        }
        catch (err) {
            next(err)
        }
        res.status(200).json("Room has been deleted")

    }

    catch (err) {
        next(err)
    }
}

// get single Room
export const singleRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    }

    catch (err) {
        next(err)
    }
}

// get all Rooms
export const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
    }

    catch (err) {
        next(err)
    }
}

// check rooms availability
export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne({ "roomNumbers._id": req.params.id }, {
            $push: {
                "roomNumbers.$.unavailableDates": req.body.dates,
            },

        },
        )
        res.status(200).json("Room status has been updated.");

    }


    catch (err) {
        next(err)
    }
}

// store user id in room they booked
export const updateUser = async (req, res, next) => {
    try {
        await Room.updateOne({ "roomNumbers._id": req.params.id }, {
            $push: {
                "roomNumbers.$.userid": req.body.user,
            },

        },
        )
        res.status(200).json("Room user status has been updated.");

    }


    catch (err) {
        next(err)
    }
}


// find unavailable dates and roomnos based on userid
export const userDates = async (req, res, next) => {
    const user = req.params.userid
    try {
        const aroom = await Room.find({ "roomNumbers.userid": user })

        const rooms = aroom.map(r => {
            return r.roomNumbers.map(u => {
                if (u.userid[0] === user) {
                    return { "room_id": r._id, "roomno": u.number, "roomno_id": u._id, "dates": u.unavailableDates }
                }
            })
        })

        const dates = rooms.map(n => {
            return n.filter(u => u)
        })


        res.status(200).json(dates);

    }

    catch (err) {
        next(err)
    }
}


// cancellation
export const bookingCancel = async (req, res, next) => {
    const user = req.params.userid
    // const roomid = req.params.roomid
    const roomnoid = req.params.roomnoid
    // const roomnoid2 = ObjectId.createFromHexString(roomnoid)

    try {
        // just debugging here

        // const rooms = await Room.find({ "roomNumbers.userid": user })
        // const allRoomids = rooms.map(a => a._id)

        // const singleid = allRoomids.map(a => {
        //     if (a.equals(roomid)) {
        //         return a
        //     }
        // })

        // const result = singleid.filter(a => a)

        // const finding = await Room.findOne({ "_id": result.map(r => r) })

        // const stillFinding = finding.roomNumbers.map(r => {
        //     return r.userid.map(u => {
        //         if (u === user) {
        //             return { "Dates": r.unavailableDates, "userid": u }
        //         }
        //     })
        // })

        // const flattening = stillFinding.flat()

        // const trying = await Room.updateMany({ "roomNumbers.userid": user, "_id": roomid }, { $unset: { "roomNumbers.$.unavailableDates": 1 } })


        // check with individual id
        const trying = await Room.updateMany({ "roomNumbers._id": roomnoid }, { $unset: { "roomNumbers.$.unavailableDates": 1, "roomNumbers.$.userid": 1 } })


        res.status(200).json(trying);


    }

    catch (err) {
        next(err)
    }
}



// find hotel and city booked based on userid
export const userHotel = async (req, res, next) => {
    const user = req.params.userid
    try {
        const aroom = await Room.find({ "roomNumbers.userid": user })

        const aroomid = aroom.map(a => a._id)

        const roomnoid = aroom.map(a => (
            a.roomNumbers.map(u => {
                if (u.userid == user) {
                    return u._id
                }
            })
        ))

        const roomnoid2 = roomnoid.flat().filter(a => a)

        const hotel = []
        for (let i = 0; i < roomnoid2.length; i++) {
            const list = await Room.find({ "roomNumbers._id": roomnoid2[i] })
            const newList = list.map(a => {
                return a._id
            })
            const bookedHotel = await Hotel.find({ "rooms": newList })
            hotel.push(bookedHotel)
        }


        // const hotel = []
        // for (let i = 0; i < aroomid.length; i++) {
        //     const list = await Hotel.find({ "rooms": aroomid[i] })
        //     hotel.push(list)
        // }

        const myhotel = hotel.map(a => a.map(n => { return { "room_id": n.rooms, "name": n.name, "city": n.city } }))

        // res.status(200).json(myhotel.flat())
        res.status(200).json(myhotel.flat())


    }

    catch (err) {
        next(err)
    }
}

// mixing
export const userHotelandCity = async (req, res, next) => {
    const user = req.params.userid
    try {
        const aroom = await Room.find({ "roomNumbers.userid": user })

        const rooms = aroom.map(r => {
            return r.roomNumbers.map(u => {
                if (u.userid[0] === user) {
                    return { "roomno": u.number, "dates": u.unavailableDates }
                }
            })
        })

        const dates = rooms.map(n => {
            return n.filter(u => u)
        })


        const aroomid = aroom.map(a => a._id)

        const hotel = []
        for (let i = 0; i < aroomid.length; i++) {
            const list = await Hotel.find({ "rooms": aroomid[i] })
            hotel.push(list)
        }

        const myhotel = hotel.map(a => a.map(n => { return { "name": n.name, "city": n.city } }))

        res.status(200).json([{ "dates": dates }, { "hotel": myhotel }])
    }

    catch (err) {
        next(err)
    }
}