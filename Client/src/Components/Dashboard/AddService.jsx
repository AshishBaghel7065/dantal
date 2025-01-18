import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
function AddService() {
  const editor = useRef(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const dustytoken = useSelector((state) => state.auth.token); // Get the token from Redux store
  const token = dustytoken.replace(/^"|"$/g, ""); // Clean up token

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/service-create",
        {
          title,
          description,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message)
  
      setTitle("");
      setImage("");
      setDescription("");
    } catch (error) {
      toast.error("Something Wrong")
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <div className="spinner-border" role="status" />
        <p>Loading Dashboard...</p>
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
                <label
                  htmlFor="serviceName"
                  className="form-label fw-bold fs-5"
                >
                  Service Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="serviceName"
                  name="title"
                  placeholder="Enter the service name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required={true}
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
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required={true}
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
                  value={description}
                  onChange={(newContent) => setDescription(newContent)}
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

export default AddService;
