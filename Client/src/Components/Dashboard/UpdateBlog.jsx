import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBlog() {
  const { id } = useParams(); // Extract 'id' from the URL parameters
  const navigate = useNavigate();
  const editor = useRef(null);
  const [loading, setLoading] = useState(true);
  const dustytoken = useSelector((state) => state.auth.token); // Get the token from Redux store
  const token = dustytoken.replace(/^"|"$/g, ""); // Clean up token

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    dateofPost: "",
    description: "",
  });

  // Fetch blog details by ID
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        if (!id) {
          console.error("No Blog ID provided");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:8000/api/getblog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Blog data:", response.data.blog);
        const blog = response.data.blog;

        // Set the form data with the fetched blog data
        if (response.data) {
          setFormData({
            title: blog.title,
            image: blog.image,
            dateofPost: blog.dateofPost,
            description: blog.description,
          });
        } else {
          console.error("Blog with the given id not found.");
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id, token]);

  // Handle form submission for updating the blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/blog-update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Blog updated:", response.data);
      navigate("/dashboard/blog"); // Redirect to the blog dashboard
    } catch (error) {
      console.error("Error updating the blog:", error);
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
        <p>Loading Blog...</p>
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
                <label htmlFor="blogTitle" className="form-label fw-bold fs-5">
                  Blog Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="blogTitle"
                  name="title"
                  placeholder="Enter blog title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="blogImage" className="form-label fw-bold fs-5">
                  Blog Image
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="blogImage"
                  name="image"
                  placeholder="Add Image URL"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="dateofPost" className="form-label fw-bold fs-5">
                  Date of Post
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateofPost"
                  name="dateofPost"
                  value={formData.dateofPost}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-12 my-3">
                <label
                  htmlFor="blogDescription"
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

export default UpdateBlog;
