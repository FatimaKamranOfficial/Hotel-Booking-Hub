import User from '../models/User.js'
import nodemailer from 'nodemailer'

// update user
export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedUser)
    }

    catch (err) {
        next(err)
    }
}

// delete user
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")

    }

    catch (err) {
        next(err)
    }
}

// get single user
export const singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }

    catch (err) {
        next(err)
    }
}

// get all users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    }

    catch (err) {
        next(err)
    }
}

// sending email to anyone
export const sendingEmail = async (req, res, next) => {
    try {

        const transporter = nodemailer.createTransport({
            service: process.env.SMPT_SERVICE,
            auth: {
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_PASSWORD,
            }
        });

        const mailOptions = {
            from: process.env.SMPT_MAIL,
            to: req.body.email,
            subject: 'Latest Updates from Hotel Booking Hub (hotelbookinghub.com)',
            text: "Dear user / visitor, \nYou requested for the latest offers and updates available at hotelbookinghub.com \nCurrently, we are offering discounts upto 20 % on every hotel that you book for your vacations all around the world. \nBy using our website, you can easily get 20 % off any hotel, resort, apartment, cabin or villa on any location for your stay. \n\nTo know about latest updates keep following our website hotelbookinghub.com \n\nThank You for choosing us for your stay. \n\n\nRegards, \nHotel Booking Hub Admin Team, \nhotelbookinghub.com",
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                res.status(200).json({
                    success: true,
                    message: "Email sent successfully",
                })
            }
        });

    }
    catch (err) {
        next(err)
    }

}

