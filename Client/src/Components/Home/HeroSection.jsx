import React from 'react';
import ImageSlider from '../ImageSlider';

function HeroSection() {
  return (
    <section className="hero-section ubuntu-light">
      <div className="container">
        <div className="row align-items-center hero-row">
          <div className="col-lg-6 order-lg-2">
            <img src="/teeth.png" alt="Dental Care" className="w-100 hero-image" />
          </div>
          <div className="col-lg-6 order-lg-1">
            <div className="top-heading">
              <h1>Shivaay Dental Clinic</h1>
              <p className="subheading">
                Your smile is our priority. Experience the best dental care with a personalized touch.
              </p>
              <button className="hero-btn mt-3">
                Book an Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
