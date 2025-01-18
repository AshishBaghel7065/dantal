import React from "react";
import CountUp from "../count";
import { CgSandClock } from "react-icons/cg";
function WhySection() {
  return (
    <section>
      <div className="container why pad-30 ubuntu-light">
        <div className="row align-items-center">
          <div className="col-lg-6">
          <h1 className="primary-color ">Achievements</h1>
        
            <p className="secondary-color">
              Our consistent efforts and dedication have led us to significant
              milestones in the healthcare industry.
            </p>
            <p className="secondary-color">
              With 15 years of experience, we have continuously improved and
              expanded our services to meet the evolving needs of our patients.
            </p>
            <p className="secondary-color">
              Having successfully completed over 1500 surgeries, our team
              remains committed to providing high-quality care and the best
              possible outcomes for every patient.
            </p>
            <p className="secondary-color">
              Our advanced certifications demonstrate our commitment to staying
              at the forefront of the medical field, ensuring the highest
              standard of care.
            </p>
            <div className="col-lg-3 text-center">
            <div className="navbar-btn px-3">Book Now</div>
            </div>
          </div>

          {/* CountUp Section */}
          <div className="col-lg-6">
            <div className="row align-items-end">
              <div className="col-lg-6">
                <div className="target sp">
                  <CountUp target={15} />
                  <p>Years of Experience</p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="target">
                  <CountUp target={1500} />
                  <p>Successful Surgeries</p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="target">
                  <CountUp target={4} />
                  <p>Advanced Certifications</p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="target sp">
                  <CountUp target={3000} />
                  <p>Happy Patients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhySection;
