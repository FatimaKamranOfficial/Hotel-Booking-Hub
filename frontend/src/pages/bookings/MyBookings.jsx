import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { AuthContext } from '../../context/authContext'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch'
import './bookings.css'


const MyBookings = () => {

  const { user } = useContext(AuthContext)
  const location = useLocation()
  const userid = location.pathname.split("/")[2]
  const navigate = useNavigate()

  const { data, loading, error } = useFetch(`/rooms/user/dates/${userid}`)

  const roomnos = data.map(r => r.map(
    room =>
      room.roomno
  )
  )

  // room id
  // const roomnoid = data.map(r => r.map(
  //   room => room.room_id
  // ))

  // roomno id
  const roomnoid = data.map(r => r.map(
    room => room.roomno_id
  ))

  const wow = []
  const sep = roomnoid.map(a => { wow.push(...a) })
  console.log(wow)

  const roomarr = roomnos.toString().split(",")

  const dates = data.map(d => d.map(
    n => n.dates.map(
      date => date
    )
  ))

  const modDates = data.map(d => d.map(
    n => n.dates.map(
      date => date.toString().split("T21:00:00.000Z").map(d => d)
    )
  )

  )

  const datearr = dates.toString().split("T21:00:00.000Z").map(d => d)

  const myData = useFetch(`/rooms/user/hotel/${userid}`)

  const hotel = myData.data.map(a => a.name)

  const city = myData.data.map(a => a.city)

  let roomids

  function HandleCancel(e) {

    let getId = document.getElementById(e.target.id)
    let roomno = getId.value

    roomids = roomno.toString().split(',')
    const roomnoid = roomids.toString()

    navigate(`/bookings/cancel/${userid}/${roomnoid}`)

  }

  // for classnames used in button
  let i = 0

  return (

    <div>
      <Navbar />

      <div className='booking'>
        <h3>Dear, {user.username}</h3>
        <p>Please find your booking reservations in the table below: </p>

        <p><b>IMPORTANT NOTICE: </b> The payment will be made directly at the hotel on or before the booked dates. Thank You !!</p>

        <div className='tables'>
          <table className='room'>
            <tr className='heading'>
              <th>Rooms</th>
            </tr>
            <tr className='rooms'>
              {/* {roomnos.map(r => <td>{r + " "}</td>)} */}
              {roomarr.map(r => <td>{r}</td>)}

            </tr>
          </table>

          <table className='date'>
            <tr className='heading'>
              <th>Dates</th>
            </tr>
            <tr>
              {/* {dates.map(d => <td>{d.toString().split("T21:00:00.000Z")}</td>)} */}
              {modDates.map(d => (d.map(u => <td>{u[0] + ' ' + u[u.length - 1]}</td>)))}
            </tr>
          </table>

          <table className='city'>
            <tr className='heading'>
              <th>City</th>
            </tr>
            <tr className='citys'>
              {city.map(c => <td>{c}</td>)}

            </tr>
          </table>

          <table className='hotels'>
            <tr className='heading'>
              <th>Hotel Name</th>
            </tr>
            <tr>
              {hotel.map(h => <td>{h}</td>)}
            </tr>
          </table>

          <table className='cancel'>
            <tr className='heading'>
              <th>Cancellation</th>
            </tr>
            <tr>
              {/* {roomarr.map(r => <td><button id={'aclass' + (i++)} type='button' value={r[0]} onClick={HandleCancel}>Cancel</button>  </td>)} */}
              {wow.map(r => <td><button className='bcancel' id={'aclass' + (i++)} type='button' value={r} onClick={HandleCancel}>Cancel</button>  </td>)}

            </tr>
          </table>


        </div>

      </div>


      <Footer />
    </div>
  )
}

export default MyBookings
