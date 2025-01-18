import React from 'react'
import { Link } from 'react-router-dom'

function TopSection() {
  return (
    
    <section class="top-bar">
        <div class="container">
            <div class="row py-2 align-items-center">
                <div class="col-lg-4 primary-color">
                    <p><i class="fa-solid fa-hand-holding-heart"></i> Serving Noida and Surrounding Areas</p>
                </div>
                <div class="col-lg-8">
                    <div class="top-detils">
                        <div class="details">
                            <p><i class="fa-solid fa-phone"></i> +91 9817329609</p>
                            <p><Link className='nav-link'><i class="fa-solid fa-envelope"></i> shivamani1215@gmail.com</Link></p>
                        </div>
                        <div class="social-link">
                          <Link to={"/"}>  <i class="fa-brands fa-whatsapp"></i></Link>
                           <Link to={"/"}> <i class="fa-brands fa-facebook"></i></Link>
                          <Link to={"/"}>  <i class="fa-brands fa-instagram"></i></Link>
                           <Link to={"/"}> <i class="fa-solid fa-location-dot"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default TopSection