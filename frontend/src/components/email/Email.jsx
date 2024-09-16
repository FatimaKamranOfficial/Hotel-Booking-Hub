import React, { useState } from 'react'
import './email.css'
import axios from "axios";

const Email = () => {

    const [email, setEmail] = useState({
        email: undefined,
    })

    const handleChange = (e) => {
        setEmail(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/users/email", email)
            alert(`Email send successfully`)
        }

        catch (err) {

        }

    }


    return (
        <div className='mail'>
            <h2 className="mailtitle">Be The First To Receive Best Offers Updates !</h2>
            <span className="maildesc">Sign Up and enter your Email for free to receive the best deals for your stay</span>
            <div className="mailinputcontainer">
                <input type='text' id='email' onChange={handleChange} placeholder='Your Email...' />
                <button onClick={handleClick}>Subscribe</button>
            </div>
        </div>
    )
}

export default Email
