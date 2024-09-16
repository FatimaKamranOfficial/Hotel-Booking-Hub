import React from 'react'
import './propertylist.css'
import hotel from '../../images/hotel.jpg'
import resort from '../../images/resort.jpg'
import apartment from '../../images/apartment.jpg'
import cabin from '../../images/cabin.jpg'
import villa from '../../images/villa.jpg'
import useFetch from '../../hooks/useFetch'
import { Link } from 'react-router-dom'

const PropertyList = () => {
    const { data, loading, error } = useFetch("/hotels/countByType")

    const images = [
        `${hotel}`,
        `${resort}`,
        `${apartment}`,
        `${cabin}`,
        `${villa}`,
    ]

    return (
        <div className='plist'>

            {loading ? "Loading... Please Wait..." :
                <>{data && images.map((img, i) => (
                    <div className="plistitem" key={i}>
                        <img src={img} alt="pic" className="plistimg" />
                        <div className="plisttitle">
                            <Link to={`/type/${data[i]?.type}`}> <h1>{data[i]?.type}s</h1></Link>
                            <h2>{data[i]?.count} {data[i]?.type}s</h2>
                        </div>
                    </div>
                ))}

                </>}

        </div>
    )
}

export default PropertyList
