import React, { useContext, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Email from '../../components/email/Email'
import Footer from '../../components/footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faL, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import pic from '../../images/tokyo.jpg'
import './hotel.css'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/searchContext'
import { AuthContext } from '../../context/authContext'
import Reserve from '../../components/reserve/Reserve'

const Hotel = () => {

  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [openModal, setOpenModal] = useState(false)

  const { data, loading, error } = useFetch(`/hotels/find/${id}`)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const { dates, options } = useContext(SearchContext)

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const diffDay = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDay
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate)

  const handleClick = () => {
    if (user) {
      setOpenModal(true)
    }

    else {
      navigate("/login")
    }
  }


  return (
    <div>
      <Navbar />
      {loading ? "Loading...Please Wait" : <>
        <div className="hotelcontainer">

          <div className="hotelwrapper">
            <button onClick={handleClick} className='booknow'>Book Now!</button>

            <h1 className="hoteltitle">{data.name}</h1>

            <div className="hoteladdress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>

            <span className="hoteldistance">Excellent location - {data.distance}</span>
            <span className="hotelprice">Book a stay over SAR {data.cheapestPrice} and book a free taxi from airport</span>

            <div className="hotelimages">
              <img className='hotelimg' src={data.photos?.[0]} alt="" />
              <img className='hotelimg' src={data.photos?.[1]} alt="" />
              <img className='hotelimg' src={data.photos?.[2]} alt="" />
              <img className='hotelimg' src={data.photos?.[3]} alt="" />
              <img className='hotelimg' src={data.photos?.[4]} alt="" />
              <img className='hotelimg' src={data.photos?.[5]} alt="" />
            </div>


            <div className="hoteldetails">

              <div className="hoteldetailtext">
                <h1 className="hoteltitle2">{data.title}</h1>
                <p className="hoteldesc">
                  {data.desc}
                </p>
              </div>

              <div className="hoteldetailprice">
                <h1>Perfect for {days} - Nights Stay!</h1>
                <span>Stay in the heart of City</span>
                <h2>
                  <b>SAR ${days * data.cheapestPrice * options.room}</b> ({days} Nights)
                </h2>
                <button onClick={handleClick}>Book Now!</button>
              </div>
            </div>



          </div>
          <Email />
          <Footer />
        </div>
      </>}

      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} user={user._id}/>}



    </div>

  )
}

export default Hotel
