import React, { useContext } from 'react'
import Navbar from '../../components/navbar/Navbar'
import './list.css'
import { useLocation } from 'react-router-dom'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import SearchItems from '../../components/searchitems/SearchItems'
import useFetch from '../../hooks/useFetch'
import { AuthContext } from '../../context/authContext'

const List = () => {

  const { user } = useContext(AuthContext)


  //This hook returns the current location object. This can be useful if you'd like to perform some side effect whenever the current location changes.
  const location = useLocation()


  // take all the states stored in location hook
  const [destination, setDestination] = React.useState(location.state.destination)
  const [dates, setDates] = React.useState(location.state.dates)
  const [openDate, setOpenDate] = React.useState(false)
  const [options, setOptions] = React.useState(location.state.options)
  const [min, setMin] = React.useState(undefined)
  const [max, setMax] = React.useState(undefined)


  const { data, loading, error, reFetch } = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 20000}`)

  const handleClick = () => {
    reFetch()
  }

  console.log(data)

  return (
    <div>
      <Navbar />

      <div className="listcontainer">
        <div className="listwrapper">

          <div className="listsearch">
            <h1 className="lstitle">SEARCH</h1>

            <div className="lsitem">
              <label>Destination:</label>
              <input placeholder={destination} type='text' />
            </div>

            <div className="lsitem">
              <label>Check-in Date:</label>
              <span className='datespan' onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && <DateRange
                onChange={item => setDates([item.selection])} minDate={new Date()} ranges={dates}
              />}
            </div>

            <div className="lsitem">
              <label>Options:</label>

              <div className="lsoptions">
                <div className="lsoptionitem">
                  <span className="lsoptext">Min Price  <small>per night</small></span>
                  <input onChange={e => setMin(e.target.value)} type="number" className="lsopinput" />
                </div>

                <div className="lsoptionitem">
                  <span className="lsoptext">Max Price <small>per night</small></span>
                  <input onChange={e => setMax(e.target.value)} type="number" className="lsopinput" />
                </div>

                <div className="lsoptionitem">
                  <span className="lsoptext">Adult</span>
                  <input min={1} type="number" className="lsopinput" placeholder={options.adult} />
                </div>

                <div className="lsoptionitem">
                  <span className="lsoptext">Children</span>
                  <input min={0} type="number" className="lsopinput" placeholder={options.children} />
                </div>

                <div className="lsoptionitem">
                  <span className="lsoptext">Room</span>
                  <input min={1} type="number" className="lsopinput" placeholder={options.room} />
                </div>

                <button onClick={handleClick} className='lsoptionbutton'>Search</button>

              </div>



            </div>



          </div>

          <div className="listresult">
            {loading ? "Loading... Please Wait..." :
              <div className='searchItems'>
                <p>NOTE: Please choose the cities as stated in home page as "Featured Cities"</p>
                {data.map(item => (
                  <SearchItems item={item} key={item._id} />
                ))}
              </div>}
          </div>


        </div>

      </div>


    </div>
  )
}

export default List
