import React, { Children, useContext } from 'react'
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faUser } from '@fortawesome/free-regular-svg-icons'
import { faBed, faL, faPerson, faPlane } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'
import headerimg from '../../images/headerimg.png'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/searchContext'
import { AuthContext } from '../../context/authContext'
import { Link } from 'react-router-dom'

const Header = () => {

    const { user } = useContext(AuthContext)


    //use state for handling the display of calendar
    const [openDate, setOpenDate] = React.useState(false)

    //use state for handling the display of destination
    const [destination, setDestination] = React.useState(false)

    // use state for date calendar
    const [dates, setDates] = React.useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])

    const navigate = useNavigate()

    //use state for handling the number of display of persons and setting the options, that is description of booking
    const [openOptions, setOpenOptions] = React.useState(false)
    const [options, setOptions] = React.useState({
        adult: 1,
        children: 0,
        room: 1,
    })

    // function for handling the number of adults, children and rooms
    const handleOption = (name, op) => {
        setOptions(prev => {
            return {
                ...prev, [name]: op === "i" ? options[name] + 1 : options[name] - 1
            }
        })
    }

    const { dispatch } = useContext(SearchContext)


    // function for handling the search button and navigating to /hotels and sending all data as state
    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
        navigate('/hotels', { state: { destination, dates, options } })
    }


    return (
        <>
            <div className="components components2">

                <div className='header'>
                    <div className="headercontainer">

                        <h1 className="headertitle">Get Your Hotel Bookings With Ease!</h1>
                        <p className="headerpara">Get 20% off on more than one hotel reservation by signing up for free</p>
                        {!user && <Link to="/register"><button className="headerbtn abtn"><FontAwesomeIcon icon={faUser} />Sign in / Register</button></Link>}
                        {user && <Link to={`/bookings/${user._id}`}><button className="headerbtn abtn"><FontAwesomeIcon icon={faPlane} />My Bookings</button></Link>}
                        {user && <h2 className='userh'>Where are you headed to, {user.username} ?</h2>}
                        <div className="headersearch">

                            <div className="headersearchitem">
                                <FontAwesomeIcon icon={faBed} className='headericon' />
                                <input type='text' placeholder='Your Destination...' className='headerinput' onChange={e => setDestination(e.target.value.toLowerCase())} />
                            </div>

                            <div className="headersearchitem">
                                <FontAwesomeIcon icon={faCalendarDays} className='headericon' />
                                <span onClick={() => setOpenDate(!openDate)} className='headerspan'>
                                    {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
                                {openDate && <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDates([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    className='headerdate'
                                    minDate={new Date()}
                                />}
                            </div>

                            <div className="headersearchitem">
                                <FontAwesomeIcon icon={faPerson} className='headericon' />
                                <span onClick={() => setOpenOptions(!openOptions)} className='headerspan'>
                                    {`${options.adult} adult . ${options.children} children . ${options.room} room`}
                                </span>


                                {openOptions && <div className="options">

                                    <div className="optionitem">
                                        <span className="optionspan">Adult</span>
                                        <div className="optionscounter">
                                            <button disabled={options.adult <= 1} className="counterbtn" onClick={() => handleOption("adult", "d")}>-</button>
                                            <span className="counternum">{options.adult}</span>
                                            <button className="counterbtn" onClick={() => handleOption("adult", "i")}>+</button>
                                        </div>

                                    </div>

                                    <div className="optionitem">
                                        <span className="optionspan">Children</span>
                                        <div className="optionscounter">
                                            <button disabled={options.children <= 0} className="counterbtn" onClick={() => handleOption("children", "d")}>-</button>
                                            <span className="counternum">{options.children}</span>
                                            <button className="counterbtn" onClick={() => handleOption("children", "i")}>+</button>
                                        </div>

                                    </div>

                                    <div className="optionitem">
                                        <span className="optionspan">Room</span>
                                        <div className="optionscounter">
                                            <button disabled={options.room <= 1} className="counterbtn" onClick={() => handleOption("room", "d")}>-</button>
                                            <span className="counternum">{options.room}</span>
                                            <button className="counterbtn" onClick={() => handleOption("room", "i")}>+</button>
                                        </div>

                                    </div>

                                </div>}
                            </div>

                            <div className="headersearchitem">
                                <button className='headerbtn' onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pic">
                    <img src={headerimg} alt="" />
                </div>
            </div>
        </>

    )
}

export default Header
