import React from 'react'
import './home.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import PropertyList from '../../components/propertylist/PropertyList'
import Apartments from '../../components/apartments/Apartments'
import Email from '../../components/email/Email'
import Footer from '../../components/footer/Footer'


const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homecontainer">

        <Featured />

        <h2 className="hometitle">Explore By Property Type</h2>
        <PropertyList />

        <h2 className="hometitle">Best Guests Locations</h2>
        <Apartments />

        <Email />

        <Footer />

      </div>
    </div>
  )
}

export default Home
