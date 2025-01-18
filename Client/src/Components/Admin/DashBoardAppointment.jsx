import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoSearchSharp } from "react-icons/io5";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { MdDelete, MdModeEdit } from "react-icons/md";


function DashBoardAppointment() {
  const [loading, setLoading] = useState(true);
  const [contactData, setContactData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState(null); // To store selected contact details for view
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [showDeletePopup, setShowDeletePopup] = useState(false); // To control delete confirmation popup visibility
  const [contactToDelete, setContactToDelete] = useState(null); // To store contact being deleted
  const dustytoken = useSelector((state) => state.auth.token); // Get the token from Redux store
  const token = dustytoken.replace(/^"|"$/g, "");


  // Fetch data from API
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getAllcontact", {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token in the header
          },
        });
        setContactData(response.data);
        setFilteredData(response.data); // Initially set filtered data to all contacts
      } catch (error) {
        console.error("Error fetching contact data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchContactData();
    } else {
      setLoading(false);
      console.warn("No token available for the API call");
    }
  }, [token]);

  // Search functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter contacts based on search query
    const filtered = contactData.filter(
      (contact) =>
        contact.fullName.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.message.toLowerCase().includes(query)
    );

    setFilteredData(filtered);
  };

  // Handle "View" contact modal
  const handleViewContact = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContact(null);
  };

  // Handle "Delete" contact
  const handleDeleteContact = (contact) => {
    setContactToDelete(contact);
    setShowDeletePopup(true); // Show confirmation popup
  };

  const deleteContact = async (contact) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete-contact/${contact.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Contact deleted:", response.data);
  
      // Update both contactData and filteredData after deletion
      const updatedContactData = contactData.filter((item) => item.id !== contact.id);
      setContactData(updatedContactData); // Remove the deleted contact from contactData
      setFilteredData(updatedContactData); // Update the filtered data as well
      setShowDeletePopup(false); // Close the delete popup
      setContactToDelete(null); // Clear the contact being deleted
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };
  

  // Handle cancel delete
  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setContactToDelete(null);
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <div className="spinner-border" role="status" />
        <p>Loading Contacts...</p>
      </div>
    );
  }

  return (
    <div className="p-0 p-lg-5 bg-light">
      <div className="container-dashboard">
        <div className="add-container">
          <h4>Contact Info</h4>
        </div>
        <div className="container cfs-14">
          <div className="row justify-content-end">
            <div className="col-lg-4">
              <div className="mb-3 searchbox">
                <IoSearchSharp size={29} color="darkblue" />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>

          <div className="table-box">
            <table className="table" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>S.no</th>
                  <th style={{ width: "20%" }}>Full Name</th>
                  <th style={{ width: "20%" }}>Email</th>
                  <th style={{ width: "15%" }}>Phone</th>
                  <th style={{ width: "20%" }}>Message</th>
                  <th style={{ width: "10%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((contact, index) => (
                  <tr key={contact.id}>
                    <td>{index + 1}</td>
                    <td>{contact.fullName}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>
                      <div>
                        {contact.appointmentDate}
                      </div>
                    </td>
                    <td>
                      <button className="edit" onClick={() => handleViewContact(contact)}>
                        <FaEye />
                      </button>
                      <button className="delete" onClick={() => handleDeleteContact(contact)}>
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal to view contact details */}
          {showModal && selectedContact && (
  <div className="contactpop">
    <div className="contactpop-content">
      <h4>Contact Details</h4>
      <hr/>
      <p><strong>Full Name:</strong> {selectedContact.fullName}</p>
      <p><strong>Email:</strong> {selectedContact.email}</p>
      <p><strong>Phone:</strong> {selectedContact.phone}</p>
      <p><strong>Message:</strong> {selectedContact.appointmentDate}</p>
      <button className="btn btn-secondary" onClick={handleCloseModal}>
        Close
      </button>
    </div>
  </div>
)}


          {/* Confirmation Popup */}
          {showDeletePopup && contactToDelete && (
            <div className="delete-popup">
              <div className="popup-content">
                <h5>Are you sure you want to delete this contact?</h5>
                <div className="d-flex justify-content-between">
                  <button
                    className="bg-danger text-white"
                    onClick={() => deleteContact(contactToDelete)} // Pass the contact to delete
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
        </div>
      </div>
    </div>
  );
}

export default DashBoardAppointment;
