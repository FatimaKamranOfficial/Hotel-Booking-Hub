import React, { useContext } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import useFetch from '../../hooks/useFetch'
import './cancellation.css'
import cancel from '../../images/cancel.gif'

const Cancellation = () => {


  const { user } = useContext(AuthContext)
  const location = useLocation()
  const userid = location.pathname.split("/")[3]
  const roomnoid = location.pathname.split("/")[4]

  const { data, loading, error } = useFetch(`/rooms/user/cancel/${userid}/${roomnoid}`)

  return (
    <div>
      <Navbar />

      <div className="cancelc">
        <h1 className='cancelh1'>Cancellation Was Successful !!!</h1>
        <img className='cancelgif' src={cancel} alt="" />
        <p className='cancelp'>The room at the hotel that you had booked has been successfully canceled </p>
        <p className='cancelp'>To book another room in the same hotel or at a different hotel, return back to the home page</p>
        <p className='cancelp'>Thank You for choosing hotelbookinghub.com to book your stay !!!</p>
      </div>

      <Footer />
    </div>
  )
}

export default Cancellation
