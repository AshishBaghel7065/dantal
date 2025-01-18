import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp  , FaInstagram , FaFacebook  , FaLinkedinIn  ,FaYoutube ,FaTwitter} from "react-icons/fa";
function Footer() {
  return (
    <div>
      <footer className="mt-5 ubuntu-light">
        <div className="container text-white">
          <div className="row my-5 justify-content-center">
            <div className="col-lg-5">
              <div className="my-3">

                <h1 className='my-5'>SHIVAAY DENTAL CLINIC</h1>
              </div>
              <p>Welcome to SHIVAAY DENTAL CLINIC, led by Dr. Shiva Mani, offering expert dental care with the latest technology in a comfortable setting. We specialize in oral and maxillofacial surgery, cranio-maxillofacial trauma, and general dentistry. Trust your smile to us for the best dental experience!</p>
            </div>
            <div className="col-lg-7">
              <h3 className="top-btn text-white my-3">Contact Us</h3>
              <p>For appointments, inquiries, or more information, feel free to reach out to us!</p>
              <ul className="contact-info">
                <li><strong>Doctor:</strong> Dr. Shiva Mani</li>
                <li><strong>Qualifications:</strong> BDS, MDS (Oral and Maxillofacial Surgery), ATLS (USA), Fellow in Cranio-Maxillofacial Trauma (PGI Rohtak)</li>
                <li><strong>Address:</strong> H-1215 Satyam Vihar, Avas Vikas-1, Kalyanpur, Kanpur, UP, PIN: 208017</li>
                <li><strong>Contact:</strong> +91 9817329609, +91 9793266751, +91 9653044794</li>
                <li><strong>Email:</strong> shivamani1215@gmail.com</li>
              </ul>
            </div>
          </div>

          <div className="row my-5 justify-content-center">
            <div className="col-lg-3">
              <h3>About Us</h3>
              <div className="footer-list-box">
                <ul className="m-0 p-0 list-unstyled">
                  <li><Link href="#services">Our Services</Link></li>
                  <li><Link href="#doctor">Meet Dr. Shiva Mani</Link></li>
                  <li><Link href="#mission">Our Mission</Link></li>
                  <li><Link href="#contact">Contact Information</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <h3>Dental Services</h3>
              <div className="footer-list-box">
                <ul className="m-0 p-0 list-unstyled">
                  <li><Link href="#oral-surgery">Oral and Maxillofacial Surgery</Link></li>
                  <li><Link href="#cranio-maxillofacial">Cranio-Maxillofacial Trauma</Link></li>
                  <li><Link href="#general-dentistry">General Dentistry</Link></li>
                  <li><Link href="#cosmetic-dentistry">Cosmetic Dentistry</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <h3>Appointment</h3>
              <div className="footer-list-box">
                <ul className="m-0 p-0 list-unstyled">
                  <li><Link href="#book-appointment">Book an Appointment</Link></li>
                  <li><Link href="#appointment-guidelines">Appointment Guidelines</Link></li>
                  <li><Link href="#faq">FAQ</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <h3>Follow Us</h3>
              <div className="footer-list-box">
                <ul className="m-0 p-0 list-unstyled">
                  <li><Link href="#testimonials">Patient Testimonials</Link></li>
                  <li><Link href="#vlogs">Our Vlogs</Link></li>
                  <li><Link href="#social">Social Media</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-6">
              <h3 className="m-3">Accepted Payment Methods</h3>
              <div className="payment-mode">
                <img src="./assets/img/google-pay-svgrepo-com.svg" alt="Google Pay" />
                <img src="./assets/img/mastercard-svgrepo-com.svg" alt="MasterCard" />
                <img src="./assets/img/paytm-svgrepo-com.svg" alt="Paytm" />
                <img src="./assets/img/visa-svgrepo-com.svg" alt="Visa" />
              </div>
            </div>
            <div className="col-lg-6">
              <h3 className="m-3">Connect With Us</h3>
              <div className="social-links">
                <Link href="#" target="_blank" className="social-link"><FaWhatsapp color='white' /></Link>
                <Link href="#" target="_blank" className="social-link"><FaInstagram color='white'/></Link>
                <Link href="#" target="_blank" className="social-link"><FaFacebook color='white'/></Link>
                <Link href="#" target="_blank" className="social-link"><FaLinkedinIn color='white'/></Link>
                <Link href="#" target="_blank" className="social-link"><FaYoutube color='white'/></Link>
                <Link href="#" target="_blank" className="social-link"><FaTwitter color='white'/></Link>
              </div>
            </div>
          </div>

          <hr className="text-white" />
          <div className="row mt-3">
            <div className="container text-center text-white">
              <div className="row">
                <div className="col-lg-6">
                  <p>Copyrights 2024-25. All Rights Reserved for SHIVAAY DENTAL CLINIC.</p>
                </div>
                <div className="col-lg-6">
                  <p><Link href="#" className="text-white">Privacy</Link> | <Link href="#" className="text-white">Terms & Conditions</Link> | </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
