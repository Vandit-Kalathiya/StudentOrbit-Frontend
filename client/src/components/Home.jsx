// eslint-disable-next-line no-unused-vars
import React from 'react'
import Hero from './Hero'
import About from './About'
import Contact from './Contact'
import Footer from './Footer'
import ServicesSection from './ServiceCard'
import CreativeHeroSlider from './CreativeHeroSlider'
import IntroSection from './IntroSection'
import KeewayFeatures from './KeeWayFeatures'
import EndPart from './EndPart'
import MainSection from './MainSection'
import "../../init";

function Home() {
  return (
    <>
      <Hero />
      <ServicesSection/>
      <CreativeHeroSlider/>
      <IntroSection/>
      <KeewayFeatures/>
      <EndPart/>
      <MainSection/>
      <Footer/>
    </>
  )
}

export default Home
