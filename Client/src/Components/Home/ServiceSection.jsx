import React, { useEffect, useState } from 'react';
import ServiceBox from '../ServiceBox';
import { FaRegSmile, FaTooth, FaMedkit, FaUserMd, FaChild, FaStethoscope, FaBrush } from 'react-icons/fa';
import axios from 'axios';



function ServiceSection() {
const [services, setServices] = useState([]);
useEffect(() => {
  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/getAllservice"
      ); // Replace with your API URL
      setServices(response.data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchServices();
}, []);


  return (
    <div>
      <div className="container">
      <div className='section-heading'>
      <h1 className=' text-center primary-color'>Our Services</h1>
      </div>
        <div className="row">
          {services.map((service, index) => (
            <div key={index} className="col-lg-3">
              <ServiceBox
                title={service.title}
                description={service.description}
                icons={service.icon}
                connect={"Contact Now"}
              />
            </div>
          ))}
        </div>  
      </div>
    </div>
  );
}

export default ServiceSection;
