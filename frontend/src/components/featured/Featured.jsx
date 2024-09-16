import React from 'react'
import './featured.css'
import tokyo from '../../images/tokyo.jpg'
import abha from '../../images/abha.jpg'
import istanbul from '../../images/istanbul.png'
import london from '../../images/london.jpg'
import sydney from '../../images/sydney.jpg'
import male from '../../images/male.jpg'
import useFetch from '../../hooks/useFetch'
import { Link } from 'react-router-dom'


const Featured = () => {

    const { data, loading, error } = useFetch("/hotels/countByCity?cities=tokyo,istanbul,abha,sydney,london,male")

    return (

        <>
            <h2>Featured Cities</h2>
            <div className='featured'>

                {loading ? "Loading... Please Wait..." :
                    <>
                        <div className="featureditem">
                            <img src={tokyo} alt="tokyo" className="featuredimg" />
                            <div className="featuredtitles">
                                <h1>TOKYO</h1>
                                <h2>{data[0]} Hotels</h2>
                            </div>
                        </div>


                        <div className="featureditem">
                            <img src={istanbul} alt="istanbul" className="featuredimg" />
                            <div className="featuredtitles">
                                <h1>ISTANBUL</h1>
                                <h2>{data[1]} Hotels</h2>
                            </div>
                        </div>

                        <div className="featureditem">
                            <img src={abha} alt="abha" className="featuredimg" />
                            <div className="featuredtitles">
                                <h1>ABHA</h1>
                                <h2>{data[2]} Hotels</h2>
                            </div>
                        </div>

                        <div className="featureditem">
                            <img src={sydney} alt="sydney" className="featuredimg" />
                            <div className="featuredtitles">
                                <h1>SYDNEY</h1>
                                <h2>{data[3]} Hotels</h2>
                            </div>
                        </div>

                        <div className="featureditem">
                            <img src={london} alt="london" className="featuredimg" />
                            <div className="featuredtitles">
                                <h1>LONDON</h1>
                                <h2>{data[4]} Hotels</h2>
                            </div>
                        </div>

                        <div className="featureditem">
                            <img src={male} alt="male" className="featuredimg" />
                            <div className="featuredtitles">
                                <h1>MALE</h1>
                                <h2>{data[5]} Hotels</h2>
                            </div>
                        </div>

                        


                    </>}

            </div>
        </>
    )
}

export default Featured
