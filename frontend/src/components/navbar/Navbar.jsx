import React, { useContext, useState } from 'react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import axios from "axios";


const Navbar = () => {

  const { user, loading, error, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()


  const handleClick = async (e) => {
    e.preventDefault()
    try {
      dispatch({ type: "LOGOUT", payload: null })
      navigate("/")
    }

    catch (err) {
    }
  }

  return (
    <div className='navbar'>
      <div className="navcontainer">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          <span className="logo">Hotel Booking Hub</span>
        </Link>


        {user && (
          <div className="navitems">
            <span>Welcome Back</span>
            <button onClick={handleClick} className="navbutton">LOGOUT</button>
          </div>
        )}

        {!user && (
          <div className="navitems">
            <Link to="/register"><button className="navbutton">REGISTER</button></Link>
            <Link to="/login"><button className="navbutton">LOGIN</button></Link>
          </div>
        )}


      </div>
    </div>
  )
}

export default Navbar
