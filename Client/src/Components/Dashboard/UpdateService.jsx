import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UpdateService() {
  const { id } = useParams(); // Extract 'id' from the URL parameters
  const navigate = useNavigate();
  const editor = useRef(null);
  const [loading, setLoading] = useState(true);
  const dustytoken = useSelector((state) => state.auth.token); // Get the token from Redux store
  const token = dustytoken.replace(/^"|"$/g, ""); // Clean up token

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
  });

  // Fetch service details by ID
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        if (!id) {
          console.error("No Service ID provided");
          setLoading(false);
          return;
        }

        // Fetch the service data
        const response = await axios.get(
          `http://localhost:8000/api/getservice/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Service data:", response.data.data);
        const service = response.data.data;
        // Set the form data with the fetched service data
        if (response.data) {
          setFormData({
            title: service.title,
            image: service.image,
            description: service.description,
          });


        } else {
          console.error("Service with the given id not found.");
        }
      } catch (error) {
        console.error("Error fetching service data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [id, token]);

  // Handle form submission for updating the service
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/service-update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Service updated:", response.data);
      navigate("/dashboard/service"); // Redirect to the services dashboard
    } catch (error) {
      console.error("Error updating the service:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <div className="spinner-border" role="status" />
        <p>Loading Service...</p>
      </div>
    );
  }

  return (
    <div className="container py-3">
      <div className="sr">
        <form
          className="row g-3 needs-validation"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="col-lg-12">
            <div className="row">
              <div className="col-md-8">
                <label htmlFor="serviceName" className="form-label fw-bold fs-5">
                  Service Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="serviceName"
                  name="title"
                  placeholder="Enter the service name"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label
                  htmlFor="serviceImage"
                  className="form-label fw-bold fs-5"
                >
                  Image for Service
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="serviceImage"
                  name="image"
                  placeholder="Add Image Link"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-12 my-3">
                <label
                  htmlFor="description"
                  className="form-label fw-bold fs-5"
                >
                  Description
                </label>
                <JoditEditor
                  ref={editor}
                  value={formData.description}
                  onChange={(newContent) =>
                    setFormData({ ...formData, description: newContent })
                  }
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateService;
