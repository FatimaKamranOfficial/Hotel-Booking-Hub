import React from 'react'
import './footer.css'
import download from '../../images/download.png'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

const Footer = () => {
    return (
        <div className='footer'>

            <div className="left">
                <h4>Download on Google Play and App Store</h4>
                <img src={download} alt="" />
            </div>

            <div className="center">
                <h2>Hotel Booking Hub</h2>
                <h3>copyright &copy; hotelbookinghub.com</h3>
                <h3>Developed by: Fatima Kamran <FontAwesomeIcon className='heart' icon={faHeart}/></h3>
            </div>

            <div className="right">
                <h4>Important Links</h4>
                <Link to="/register">Register for account</Link>
                <Link to='/login'>Login to your account</Link>
            </div>


        </div>
    )
}

export default Footer
