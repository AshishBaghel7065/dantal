import { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ViewFaq from "../Dashboard/ViewFaq";  // Import the ViewFaq component

function DashBoardFAQ() {
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);
  const [selectedFaq, setSelectedFaq] = useState(null); // For viewing FAQ

  const dustytoken = useSelector((state) => state.auth.token); // Get the token from Redux store
  const token = dustytoken.replace(/^"|"$/g, "");

  // Fetch FAQs from the API
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getAllfaq");
        setFaqs(response.data.faqs);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  // Handle FAQ deletion
  const deleteFAQ = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete-faq/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFaqs(faqs.filter((faq) => faq.id !== id));
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    } finally {
      setShowDeletePopup(false);
      setFaqToDelete(null); // Clear the FAQ to delete state
    }
  };

  // Show confirmation popup for deletion
  const confirmDelete = (faq) => {
    setFaqToDelete(faq.id);
    setShowDeletePopup(true);
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setFaqToDelete(null);
  };

  // Show the view popup for FAQ
  const handleViewFaq = (faq) => {
    setSelectedFaq(faq);
  };

  // Close the FAQ view popup
  const closeViewFaqPopup = () => {
    setSelectedFaq(null);
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
          <h4>FAQ Info</h4>
          <Link to={"/dashboard/add-faq"}>
            <button className="add-btn px-4">Add FAQ</button>
          </Link>
        </div>
        <div className="container cfs-14">
          <div className="table-box">
            <table className="table p-1" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>S.no</th>
                  <th style={{ width: "30%" }}>Question</th>
                  <th style={{ width: "40%" }}>Answer</th>
                  <th style={{ width: "10%" }}>Answer Written By</th>
                  <th style={{ width: "15%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((faq, index) => (
                  <tr key={faq.id}>
                    <td>{index + 1}</td>
                    <td>{faq.question}</td>
                    <td>{faq.answer}</td>
                    <td>{faq.answerWrittenBy}</td>
                    <td className="spd">
                      <div className="d-flex gap-2">
                        <div className="button-container">
                          <button className="edit" onClick={() => handleViewFaq(faq)}>
                            <FaEye />
                          </button>
                          <span className="hover-text">View FAQ</span>
                        </div>
                        <div className="button-container">
                         <Link to={`/dashboard/update-faq/${faq.id}`}> <button className="edit">
                            <MdModeEdit />
                          </button></Link>
                          <span className="hover-text">Edit FAQ</span>
                        </div>
                        <div className="button-container">
                          <button
                            className="edit"
                            onClick={() => confirmDelete(faq)}
                          >
                            <MdDelete />
                          </button>
                          <span className="hover-text">Delete FAQ</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Confirmation Popup */}
        {showDeletePopup && (
          <div className="delete-popup">
            <div className="popup-content">
              <h5>Are you sure you want to delete this FAQ?</h5>
              <div className="d-flex justify-content-between">
                <button
                  className="bg-danger text-white"
                  onClick={() => deleteFAQ(faqToDelete)}
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

        {/* View FAQ Popup */}
        {selectedFaq && (
          <ViewFaq faq={selectedFaq} onClose={closeViewFaqPopup} />
        )}
      </div>
    </div>
  );
}

export default DashBoardFAQ;
