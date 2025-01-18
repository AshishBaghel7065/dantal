import React from 'react'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import Process from './Process'
import WhySection from './WhySection'
import FaqSection from './FAQ'
import CustomerReviewSection from './Review'
import ServiceSection from './ServiceSection'

function Home() {
  return (
    <div>
      <HeroSection/>
      <AboutSection/>
      <ServiceSection/>
      <Process/>
      <WhySection/>
      <CustomerReviewSection/>
      <FaqSection/>
    </div>
  )
}

export default Home