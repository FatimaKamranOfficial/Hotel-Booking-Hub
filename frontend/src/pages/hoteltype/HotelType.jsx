import React from 'react'
import { useLocation } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import './hoteltype.css'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

const HotelType = () => {

    const location = useLocation()
    const type = location.pathname.split("/")[2]

    const { data, loading, error } = useFetch(`/hotels/type?type=${type}`)

    return (
        <>
            <Navbar />
            <div className="hoteltype">
                {data.map(item => (
                    <div className='hitem'>
                        <img src={item.photos[0]} alt="" className="siimg" />

                        <div className="hdesc">
                            <h1 className="htitle">{item.name}</h1>
                            <span className="hdistance">{item.distance} from the center</span>
                            <span className="htaxi">Free Taxi from airport</span>
                            <span className="hsubtitle">Studio apartment with air conditioning</span>
                            <span className="hcancelop">Free cancellation</span>
                            <span className="hcancelopsubtitle">You can cancel anytime, so book now!</span>
                        </div>


                        <div className="hdetails">

                            {item.rating &&
                                <div className="hrating">
                                    <span>Excellent</span>
                                    <button>{item.rating}</button>
                                </div>}

                            <div className="hdetailtexts">
                                <span className="hprice">${item.cheapestPrice}</span>
                                <span className="htaxop">Includes taxes and fees</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>

    )
}

export default HotelType
