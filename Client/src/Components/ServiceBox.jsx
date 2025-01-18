import React from 'react'
import { FaPlus } from "react-icons/fa6";

function ServiceBox({ title, description  ,icons , connect  }) {
  return (
    <div className='service-box'>
      <div>
      <div className="service-icon">{icons}</div>
        <h2 className='my-2'>{title}</h2>
        <p className='my-5'>{description}</p>
        <button className='service-btn'>
          <FaPlus /> {connect}
        </button>
      </div>
    </div>
  );
}

export default ServiceBox;
