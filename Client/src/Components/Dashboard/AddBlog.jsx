import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddBlog() {
  const editor = useRef(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [dateofPost , setDateofPost] = useState("")
  const [description, setDescription] = useState("");
  const dustytoken = useSelector((state) => state.auth.token); // Get the token from Redux store
  const token = dustytoken.replace(/^"|"$/g, ""); // Clean up token
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check for empty fields
    if (!title || !description || !image || !dateofPost) {
      console.error("All fields are required.");
      console.log("Please fill out all fields.", title ,description ,image ,dateofPost );
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:8000/api/blog-create",
        { title, description, image, dateofPost },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Blog added:", response.data);

  
      // Reset form fields
      setTitle("");
      setImage("");
      setDescription("");
      setDateofPost("");
      navigate("/dashboard/blog");
    } catch (error) {
      console.error("There was an error adding the blog!", error);
    }
  };
  
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <div className="spinner-border" role="status" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container py-3">
      <div className="sr">
        <form
          className="row g-3 needs-validation"
          noValidate
          
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="blogImage" className="form-label fw-bold fs-5">
                  Date of Post
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateofpost"
                  name="dateofpost"
                  placeholder="Add Image URL"
                  value={dateofPost}
                  onChange={(e) => setDateofPost(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-12 my-3">
                <label htmlFor="blogDescription" className="form-label fw-bold fs-5">
                  Description
                </label>
                <JoditEditor
                  ref={editor}
                  value={description}
                  onChange={(newContent) => setDescription(newContent)}

                />
              </div>
            </div>
            <button  onClick={handleSubmit} className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBlog;
