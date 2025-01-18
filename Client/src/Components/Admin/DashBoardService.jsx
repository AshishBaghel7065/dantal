import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import ViewService from "../Dashboard/ViewService";
import toast, { Toaster } from 'react-hot-toast';
function DashBoardService() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [selectedService, setSelectedService] = useState(null); 

  const dustytoken = useSelector((state) => state.auth.token); 
  const token = dustytoken.replace(/^"|"$/g, "");

  // Fetch services from the API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/getAllservice"
        );
        setServices(response.data.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Handle service deletion
  const deleteService = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete-service/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServices(services.filter((service) => service.id !== id));
       toast.success("Delete Succesfully")

    } catch (error) {
      toast.error("Something Wrong")
    } finally {
      setShowDeletePopup(false);
      setServiceToDelete(null);
    }
  };

  // Show confirmation popup for deletion
  const confirmDelete = (service) => {
    setServiceToDelete(service.id);
    setShowDeletePopup(true);
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setServiceToDelete(null);
  };

  // Show the view popup for service
  const handleViewService = (service) => {
    setSelectedService(service);
  };

  // Close the service view popup
  const closeViewServicePopup = () => {
    setSelectedService(null);
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <div className="spinner-border" role="status" />
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-0 p-lg-5 bg-light">
      <div className="container-dashboard">
        <div className="add-container">
          <h4>Service Info</h4>
          <Link to={"/dashboard/add-service"}>
            <button className="add-btn">Add Service</button>
          </Link>
        </div>
        <div className="container cfs-14">
          <div className="table-box">
            <table className="table p-1" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>S.no</th>
                  <th style={{ width: "25%" }}>Service Title</th>
                  <th style={{ width: "10%" }}>Image</th>
                  <th style={{ width: "45%" }}>Description</th>
                  <th style={{ width: "15%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={service.id}>
                    <td>{index + 1}</td>
                    <td>{service.title}</td>
                    <td>
                      <img
                        src={service.image}
                        alt={service.image}
                        className="border p-1"
                        style={{
                          width: "60px",
                          height: "50px",
                          objectFit: "contain",
                        }}
                      />
                    </td>
                    <td >
                      <div
                      className="custom-td"
                        dangerouslySetInnerHTML={{
                          __html: service.description,
                        }}
                      ></div>
                    </td>
                    <td className="spd">
                      <div className="d-flex gap-2">
                        <div className="button-container">
                          <button
                            className="edit"
                            onClick={() => handleViewService(service)}
                          >
                            <FaEye />
                          </button>
                          <span className="hover-text">View Service</span>
                        </div>
                        <div className="button-container">
                          <Link to={`/dashboard/update-service/${service.id}`}>
                            <button className="edit">
                              <MdModeEdit />
                            </button>
                          </Link>
                          <span className="hover-text">Edit Service</span>
                        </div>
                        <div className="button-container">
                          <button
                            className="edit"
                            onClick={() => confirmDelete(service)}
                          >
                            <MdDelete />
                          </button>
                          <span className="hover-text">Delete Service</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Confirmation Popup */}
          {showDeletePopup && (
            <div className="delete-popup">
              <div className="popup-content">
                <h5>Are you sure you want to delete this service?</h5>
                <div className="d-flex justify-content-between">
                  <button
                    className="bg-danger text-white"
                    onClick={() => deleteService(serviceToDelete)} // Pass only the id
                  >
                    Confirm
                  </button>
                  <button
                    className="bg-black text-white"
                    onClick={handleCancelDelete}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* View Service Popup */}
          {selectedService && (
            <ViewService
              service={selectedService}
              onClose={closeViewServicePopup}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DashBoardService;
