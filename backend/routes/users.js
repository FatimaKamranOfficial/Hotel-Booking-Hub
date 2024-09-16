import express from 'express'
import { deleteUser, getAllUsers, sendingEmail, singleUser, updateUser } from '../controllers/user.js'
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js'

const router = express.Router()


// checking if token is correct
router.get('/checkauthentication', verifyToken, (req, res, next) => {
    res.send("Hello User, You are logged in")
})

// checking if user is correct
router.get('/checkuser/:id', verifyUser, (req, res, next) => {
    res.send("Hello User, You are logged in and can delete your account")
})

// checking if isAdmin
router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
    res.send("Hello Admin")
})

// Update user
router.put('/:id', verifyUser, updateUser)


// Delete user
router.delete('/:id', verifyUser, deleteUser)


// Get user
router.get('/:id', verifyUser, singleUser)



// Get all users
router.get('/', verifyAdmin, getAllUsers)

// send email
router.post('/email', sendingEmail)


export default router