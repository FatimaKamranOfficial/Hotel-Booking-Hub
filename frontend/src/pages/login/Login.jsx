import React, { useContext, useState } from 'react'
import './login.css'
import { AuthContext } from '../../context/authContext'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar'
import loginpic from '../../images/login.png'


const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    })

    const { loading, error, dispatch } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("/auth/login", credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            navigate("/")
        }

        catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
        }
    }


    return (
        <>
            <Navbar />
            <div className='login'>
                <h1>LOGIN TO YOUR ACCOUNT</h1>
                <div className="loginc">

                    <div className="lcontainer">
                        <input type="text" placeholder='username...' id='username' onChange={handleChange} className="linput" />
                        <input type="password" placeholder='password...' id='password' onChange={handleChange} className="linput" />
                        <button disabled={loading} onClick={handleClick} className='lbutton'>LOGIN</button>
                        {error && <span>{error.message}</span>}
                    </div>

                    <div className="pic"><img src={loginpic} /></div>

                </div>


            </div>

        </>
    )
}

export default Login
