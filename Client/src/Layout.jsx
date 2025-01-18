import React from 'react'
import Navbar from './Components/Layout/Navbar'
import Footer from './Components/Layout/Footer'
import { Outlet } from 'react-router-dom'
import TopSection from './Components/Layout/TopSection'

function Layout() {
  return (
    <div>
    
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout