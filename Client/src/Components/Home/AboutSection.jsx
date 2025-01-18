import React from 'react';
import ImageSlider from '../ImageSlider';

function AboutSection() {
  return (
    <section className="about-section py-2 ubuntu-light">
      <div className='section-heading'>
      <h1 className=' text-center primary-color'>About Us</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            {/* <img src="doctor.jpeg" alt="Dr. Shiva Mani" className="w-100 rounded" /> */}
            <ImageSlider/>
            <div className='clinic-name'>
            <h2 clas>SHIVAAY DENTAL CLINIC</h2>
            </div>
          </div>
          <div className="col-lg-6  pad-30">
         
            <h4>Dr. Shiva Mani</h4>
            <p className='m-0 p-0'>  <strong>Qualifications:</strong></p>
            <p className='fw-bold'>
             BDS, MDS (Oral and Maxillofacial Surgery), ATLS (USA), Fellow in Cranio-Maxillofacial Trauma (PGI Rohtak)
            </p>
            <p className='secondary-color'>
              At SHIVAAY DENTAL CLINIC, we provide exceptional dental care with a focus on oral and maxillofacial surgery. Dr. Shiva Mani is a highly qualified professional with international training and extensive experience in cranio-maxillofacial trauma. Our clinic is equipped with state-of-the-art technology to ensure the best outcomes for our patients.
            </p>
            <p className='secondary-color'>
              Whether you need routine dental care or advanced surgical procedures, our team is committed to providing compassionate, personalized service. We prioritize patient comfort and satisfaction, offering a range of treatments designed to improve your oral health and overall well-being.
            </p>

            <button className='navbar-btn px-5'>Call Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
