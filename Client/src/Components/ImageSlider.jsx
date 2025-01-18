import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ImageSlider() {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };
  return (
    <div className="slider-container container-fluid ">
      <Slider {...settings}>
        <div className="hero-slider">
          <img src="/Poster.jpeg" alt=""  className="w-100"/>
        </div>
        <div className="hero-slider">
        <img src="/Poster2.jpeg" alt=""  className="w-100"/>
        </div>
        <div className="hero-slider">
        <img src="/Poster3.jpeg" alt=""  className="w-100"/>
        </div>
        <div className="hero-slider">
        <img src="/Poster4.jpeg" alt=""  className="w-100"/>
        </div>
      
      </Slider>
    </div>
  );
}

export default ImageSlider;
