import React from 'react'
import './searchitems.css'
import pic from '../../images/istanbul.png'
import { Link } from 'react-router-dom'

const SearchItems = ({ item }) => {

    return (
        <>
            <div className='searchitem'>

                <img src={item.photos[0]} alt="" className="siimg" />

                <div className="sidesc">
                    <h1 className="sititle">{item.name}</h1>
                    <span className="sidistance">{item.distance} from the center</span>
                    <span className="sitaxi">Free Taxi from airport</span>
                    <span className="sisubtitle">Studio apartment with air conditioning</span>
                    <span className="sicancelop">Free cancellation</span>
                    <span className="sicancelopsubtitle">You can cancel anytime, so book now!</span>
                </div>


                <div className="sidetails">

                    {item.rating &&
                        <div className="sirating">
                            <span>Excellent</span>
                            <button>{item.rating}</button>
                        </div>}

                    <div className="sidetailtexts">
                        <span className="siprice">SAR {item.cheapestPrice}</span>
                        <span className="sitaxop">Includes taxes and fees</span>
                        <Link to={`/hotels/${item._id}`}>
                            <button className='sicheckbutton'>Check Availability</button>
                        </Link>
                    </div>

                </div>




            </div>

        </>



    )
}

export default SearchItems
