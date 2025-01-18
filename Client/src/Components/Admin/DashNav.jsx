import React from "react";
import { Link ,Outlet, useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { FaCalendar } from "react-icons/fa";
import { IoIosContacts } from "react-icons/io";
import { FaBlogger, FaHandshake } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { clearToken } from "../../store/TokenSlice";
import { useDispatch, useSelector } from "react-redux";

function DashNav() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();  // Get the current location
  const handleLogout = async () => {
    toast.success("Logout Succesfully")
   
    dispatch(clearToken());
    setTimeout(() => {
      navigate("/login");
      console.log("2 second")
    }, 10000);   

  };

  const getNavClass = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <div>
            <Toaster 
             position="top-right"
             reverseOrder={false}/>

      <nav
        class="navbar navbar-expand-lg bg-white dashboard-nav w-100"
        aria-label="Fifth navbar example"
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Shvaay Detal Clinic
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample05"
            aria-controls="navbarsExample05"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarsExample05">
            <ul class="navbar-nav d-lg-none dashboard-link">
              <li>
                <Link
                  to="/dashboard"
                  className={`${getNavClass(
                    "/dashboard"
                  )} px-3 py-2 equal fs-6`}
                >
                  <i className="fa-solid fa-chart-simple"></i> Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/service"
                  className={`${getNavClass(
                    "/dashboard/service"
                  )} px-3 py-2 equal fs-6`}
                >
                  <FaHandshake size={16} /> Service
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/faq"
                  className={`${getNavClass(
                    "/dashboard/faq"
                  )} px-3 py-2 equal fs-6`}
                >
                  <FaQuestionCircle size={16} /> FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/blog"
                  className={`${getNavClass(
                    "/dashboard/blog"
                  )} px-3 py-2 equal fs-6`}
                >
                  <FaBlogger size={16} /> Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/contact"
                  className={`${getNavClass(
                    "/dashboard/contact"
                  )} px-3 py-2 equal fs-6`}
                >
                  <IoIosContacts size={16} /> Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/appointment"
                  className={`${getNavClass(
                    "/dashboard/appointment"
                  )} px-3 py-2  fs-6`}
                >
                  <FaCalendar size={16} /> Appointment
                </Link>
              </li>
            </ul>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default DashNav;
