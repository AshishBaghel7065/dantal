import React from "react";
import { Link } from "react-router-dom";
import TopSection from "./TopSection";

function Navbar() {
  return (
    <div className="navbar-main">
      <TopSection/>
      <nav
        className="navbar navbar-expand-xl navbar-light py-3 ubuntu-light"
        aria-label="Sixth navbar example"
      >
        <div className="container-fluid">
          <a className="navbar-brand" to="#">
            Shivaay Dental Clinic
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample06"
            aria-controls="navbarsExample06"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarsExample06"
          >
            <ul className="navbar-nav mx-auto d-flex justify-content-center">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/service">
                  Service
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            <div>
              <button className="navbar-btn">Take Appointment</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
