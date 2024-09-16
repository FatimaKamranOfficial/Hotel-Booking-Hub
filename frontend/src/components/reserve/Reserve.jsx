import React, { useContext, useState } from 'react'
import './reserve.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faL } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/searchContext'
import axios, { all } from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'

const Reserve = ({ setOpen, hotelId , user}) => {

    const navigate = useNavigate()
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`)

    const [selectedRooms, setSelectedRooms] = useState([])

    const { dates } = useContext(SearchContext)

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())
        const dates = []
        while (date <= end) {
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }
        return dates
    }

    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date => allDates.includes(new Date(date).getTime()))
        return !isFound

    }

    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value))
    }

    const handleClick = async() => {
        try{
            await Promise.all(selectedRooms.map(roomId => {
                const res = axios.put(`/rooms/availability/${roomId}`, {dates: allDates})
                return res.data
            }))  

            await Promise.all(selectedRooms.map(roomId => {
                const resuser = axios.put(`/rooms/user/${roomId}`, {user: user})
                return resuser.data
            }))   
                     
            setOpen(false)
            navigate("/")
        }

        catch(err){

        }
    }


    return (
        <div className='reserve'>
            <div className="rContainer">
                <FontAwesomeIcon className='rClose' onClick={() => setOpen(false)} icon={faCircleXmark} />
                <span>Select Your Rooms:</span>
                {data.map(item => (
                    <div className="rItem">
                        <div className="rIteminfo">
                            <div className="rtitle">{item.title}</div>
                            <div className="rdesc">{item.desc}</div>
                            <div className="rmaxpeople"> Max People: <b>{item.maxPeople}</b></div>
                            <div className="rprice">Price: SAR {item.price}</div>
                        </div>

                        <div className="rSelectrooms">
                            {item.roomNumbers.map((roomNumber) => (
                                <div className="room">
                                    <label>{roomNumber.number}</label>
                                    <input type='checkbox' value={roomNumber._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} />
                                </div>
                            ))}
                        </div>


                    </div>
                ))}

                <button onClick={handleClick} className="rbutton">Book Room Now!</button>
            </div>
        </div>
    )
}

export default Reserve
