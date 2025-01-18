import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashNav from "./DashNav";
import { IoIosContacts } from "react-icons/io";
import { FaBlogger, FaHandshake } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation(); 



  const getNavClass = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

 

  return (
    <section>
      
      <DashNav />
      <div className="container-fluid">
        <div className="row py-3" style={{ height: "100vh" }}>
          <div className="col-lg-2 mt-2 dashboard-aside py-5">
            <div className="row">
              <div className="col-lg-12 py-2">
                <div className="d-sm-none">
                  <div className="dashboard-link">
                    <li>
                      <Link
                        to="/dashboard"
                        className={`${getNavClass("/dashboard")} px-3 py-2 equal fs-6`}
                      >
                        <i className="fa-solid fa-chart-simple"></i> Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/service"
                        className={`${getNavClass("/dashboard/service")} px-3 py-2 equal fs-6`}
                      >
                        <FaHandshake size={16} /> Service
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/faq"
                        className={`${getNavClass("/dashboard/faq")} px-3 py-2 equal fs-6`}
                      >
                        <FaQuestionCircle size={16} /> FAQ
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/blog"
                        className={`${getNavClass("/dashboard/blog")} px-3 py-2 equal fs-6`}
                      >
                        <FaBlogger size={16} /> Blog
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/contact"
                        className={`${getNavClass("/dashboard/contact")} px-3 py-2 equal fs-6`}
                      >
                        <IoIosContacts size={16} /> Contact
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/appointment"
                        className={`${getNavClass("/dashboard/appointment")} px-3 py-2  fs-6`}
                      >
                        <FaCalendar size={16} /> Appointment
                      </Link>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-10 py-0 py-lg-5"
            style={{ overflowY: "scroll", maxHeight: "100vh" }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
