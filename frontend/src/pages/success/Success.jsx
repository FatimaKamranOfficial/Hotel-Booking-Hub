import React from 'react'
import './success.css'
import Navbar from '../../components/navbar/Navbar'
import tick from '../../images/tick.png'
const Success = () => {
    return (
        <>
            <Navbar />

            <div className='success'>

                <img src={tick} alt="" />
                <h1>Your Registration was Successful !</h1>
                <h3>Please log in to your account to continue your hotel reservations</h3>
                <h3>Thank You for choosing hotelbookinghub.com to book your stay !!!</h3>

            </div>

        </>
    )
}

export default Success
