import React from 'react'
import './apartments.css'
import useFetch from '../../hooks/useFetch'

const Apartments = () => {
    const { data, loading, error } = useFetch("/hotels?featured=true")

    return (
        <div className='apartments'>
            {loading ? ("Loading....Please Wait...") : (
                <>
                    {data.map((item) => (
                        <div className="apitems" key={item._id}>
                            <img src={item.photos[0]} alt="" className="apimg" />
                            <span className="apname">{item.name}</span>
                            <span className="apcity">{item.city}</span>
                            <span className="apprice">Starting from SAR {item.cheapestPrice}</span>
                            {item.rating && <div className="aprating">
                                <button>{item.rating}</button>
                                <span>Excellent</span>
                            </div>}
                        </div>
                    ))
                    }
                </>
            )
            }



        </div>
    )
}

export default Apartments
