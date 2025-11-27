import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HomeHero from '../Home/HomeHero'
import MidSection from '../Home/MidSection'
import WhatTheySayAboutUs from '../Home/WhatTheySayAboutUs'
import Values from '../Home/Values'

const Home:React.FC = () => {
  return (
    <div>
      <Navbar />
      <HomeHero />
      <MidSection />
      <Values />
      <WhatTheySayAboutUs />
      
      <Footer />
    </div>
  )
}

export default Home
