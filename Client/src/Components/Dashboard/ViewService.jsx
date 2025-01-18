import { RiCloseLargeLine } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";

function ViewService({ service, onClose }) {
  const date = new Date(service.dateofPost); // Assuming the service has a dateofPost property

  // Extract the date and time separately
  const formattedDate = date.toLocaleDateString(); // Date in locale format
  const formattedTime = date.toLocaleTimeString(); // Time in locale format

  return (
    <div className="view-popup">
      <button onClick={onClose} className="close-btn">
        <RiCloseLargeLine />
      </button>
      <div className="viewpopup-content">
        <p className="fs-5 primary-color">Service Information</p>
        
        {/* Service Title */}
        <div className="row">
          <div className="col-lg-12 my-2">
            <div className="popup-header">
              <p>Service Title</p>
              <h3>{service.title}</h3>
            </div>
          </div>
        </div>

        {/* Service Image */}
        <div className="col-lg-12">
          <img src={service.image} alt={service.title} className="w-100 popup-image" />
        </div>
        {/* Service Description */}
        <div className="popup-body my-3">
          <p>Service Description</p>
          <div
            className="popup-description"
            dangerouslySetInnerHTML={{ __html: service.description }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ViewService;
