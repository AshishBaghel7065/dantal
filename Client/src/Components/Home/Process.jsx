import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTooth, faCalendarAlt, faUser, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function Process() {
  const steps = [
    {
      id: 1,
      title: 'Select Service',
      description: 'Choose the dental service you need from our wide range of offerings.',
      icon: faTooth,
      color : "text-danger"
    },
    {
      id: 2,
      title: 'Pick a Date & Time',
      description: 'Select a convenient date and time for your appointment.',
      icon: faCalendarAlt,
    },
    {
      id: 3,
      title: 'Enter Your Details',
      description: 'Provide your contact information for the appointment confirmation.',
      icon: faUser,
    },
    {
      id: 4,
      title: 'Confirm Appointment',
      description: 'Review your details and confirm the booking.',
      icon: faCheckCircle,
    },
  ];

  return (
    <section className="process-section ubuntu-light">
      <div className="container">
        <h2 className="text-center mb-5 primary-color">How to Book an Appointment</h2>
        <div className="row">
          {steps.map((step) => (
            <div key={step.id} className="col-lg-3 col-sm-6 mb-4">
              <div className="process-step text-center p-4">
                <FontAwesomeIcon icon={step.icon} className={`step-icon mb-3`} />
                <h5 className="step-title">{step.title}</h5>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
