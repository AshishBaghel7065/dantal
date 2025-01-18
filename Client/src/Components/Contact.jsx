import React, { useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import GoogleMap from "./GooleMap";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    appointmentDate: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('http://localhost:8000/api/postcontact', formData); // Replace with your API URL
      setSuccess("Your message has been sent successfully.");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        appointmentDate: "",
        message: "",
      });
    } catch (error) {
      setError("There was an error sending your message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container ubuntu-light ">
      <section className="contact-container">
        <div className="container-fluid bg-color">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="request-form">
                  <form
                    className="row g-3 needs-validation"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="col-md-12">
                      <label htmlFor="fullName" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="appointmentDate" className="form-label">
                        Date of Appointment
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="appointmentDate"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        className="form-control msg"
                        id="message"
                        name="message"
                        rows="3"
                        placeholder="Enter your message"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-12">
                      <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "Sending..." : "Submit"}
                      </button>
                    </div>
                  </form>
                  {success && <div className="alert alert-success mt-3">{success}</div>}
                  {error && <div className="alert alert-danger mt-3">{error}</div>}
                </div>
              </div>
              <div className="col-lg-6 p-4 contact-detail">
                <div className="mb-3">
                  <h2 className="text-center">SHIVAAY DENTAL CLINIC</h2>
                </div>
                <div className="my-1 cnt">
                  <li>
                    <strong>Address:</strong>
                  </li>
                  <ul>
                    <li>
                      H-1215 Satyam Vihar, Avas Vikas-1, Kalyanpur, Kanpur, UP, PIN: 208017
                    </li>
                  </ul>
                </div>
                <div className="my-1 cnt">
                  <li>Contact</li>
                  <ul>
                    <li>+91 9817329609,</li>
                    <li>+91 9793266751</li>
                    <li>+91 9653044794</li>
                  </ul>
                </div>
                <div className="my-1 cnt">
                  <li>
                    <strong>Email</strong>
                  </li>
                  <ul>
                    <li>
                      <MdEmail /> shivamani1215@gmail.com
                    </li>
                  </ul>
                </div>
                <div>
                  <GoogleMap />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
