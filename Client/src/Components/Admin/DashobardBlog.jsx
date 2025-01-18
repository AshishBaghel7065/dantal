import { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import ViewBlog from "../Dashboard/Viewblog";

function DashBoardBlog() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null); // For viewing a blog

  const dustytoken = useSelector((state) => state.auth.token); // Get the token from Redux store
  const token = dustytoken.replace(/^"|"$/g, "");

  // Fetch Blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/getAllblog"
        );
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);



  // Handle Blog deletion
  const deleteBlog = async (id) => {
    try {
      // Delete the Blog from the API
      await axios.delete(`http://localhost:8000/api/delete-blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the state by removing the deleted blog
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      // Close the delete popup
      setShowDeletePopup(false);
      setBlogToDelete(null);
    }
  };

  // Show confirmation popup for deletion
  const confirmDelete = (blog) => {
    setBlogToDelete(blog.id);
    setShowDeletePopup(true);
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setBlogToDelete(null);
  };

  // Show the view popup
  const handleViewBlog = (blog) => {
    setSelectedBlog(blog);
  };

  // Close the view popup
  const closeViewPopup = () => {
    setSelectedBlog(null);
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
          <h4>Blog Info</h4>
          <Link to={"/dashboard/add-blog"}>
            <button className="add-btn px-4">Add Blog</button>
          </Link>
        </div>
        <div className="container cfs-14">
          <div className="table-box">
            <table className="table p-1" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ width: "5%" }}>S.no</th>
                  <th style={{ width: "20%" }}>Blog Title</th>
                  <th style={{ width: "10%" }}>Image</th>
                  <th style={{ width: "40%" }}>Description</th>
                  <th style={{ width: "10%" }}>Date</th>
                  <th style={{ width: "15%" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr key={blog.id}>
                    <td>{index + 1}</td>
                    <td>{blog.title}</td>
                    <td>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="border p-1"
                      />
                    </td>
                    <td>
                      <div
                        className="custom-td"
                        dangerouslySetInnerHTML={{ __html: blog.description }}
                      ></div>
                    </td>

                    <td>{blog.dateofPost}</td>

                    <td className="spd">
                      <div className="d-flex gap-2">
                        <div className="button-container">
                          <button
                            className="edit"
                            onClick={() => handleViewBlog(blog)}
                          >
                            <FaEye />
                          </button>
                          <span className="hover-text">View Blog</span>
                        </div>
                        <div className="button-container">
                          <Link to={`/dashboard/update-blog/${blog.id}`}>
                            <button className="edit">
                              <MdModeEdit />
                            </button>
                          </Link>
                          <span className="hover-text">Edit Blog</span>
                        </div>
                        <div className="button-container">
                          <button
                            className="edit"
                            onClick={() => confirmDelete(blog)}
                          >
                            <MdDelete />
                          </button>
                          <span className="hover-text">Delete Blog</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showDeletePopup && (
        <div className="delete-popup">
          <div className="popup-content">
            <h5>Are you sure you want to delete this Blog?</h5>
            <div className="d-flex justify-content-between">
              <button
                className="bg-danger text-white"
                onClick={() => deleteBlog(blogToDelete)}
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

      {/* View Blog Popup */}
      {selectedBlog && (
        <ViewBlog blog={selectedBlog} onClose={closeViewPopup} />
      )}
    </div>
  );
}

export default DashBoardBlog;

