import React, { useContext, useState } from 'react'
import './register.css'
import Navbar from '../../components/navbar/Navbar'
import registerpic from '../../images/register.png'
import { RegisterContext } from '../../context/registerContext'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    email: undefined,
  })

  const { loading, error, dispatch } = useContext(RegisterContext)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch({ type: "REGISTER_START" })
    try {
      const res = await axios.post("/auth/register", credentials)
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data })
      navigate('/register/success')
    }

    catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data })
    }
  }

  return (
    <>
      <Navbar />
      <div className='register'>
        <h1>REGISTER AN ACCOUNT</h1>
        <div className="registerc">

          <div className="rcontainer">
            <input type="text" placeholder='username...' id='username' onChange={handleChange} className="rinput" />
            <input type="password" placeholder='password...' id='password' onChange={handleChange} className="rinput" />
            <input type="text" placeholder='email...' id='email' onChange={handleChange} className="rinput" />
            <span>By creating an account, you are agreeing to the <b>Terms and Conditions </b>provided in the website documentation</span>
            <button disabled={loading} onClick={handleClick} className='regbutton'>REGISTER</button>
            {error && <span>{error.message}</span>}
          </div>

          <div className="pic"><img src={registerpic} /></div>

        </div>


      </div>

    </>
  )
}

export default Register
