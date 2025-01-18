import { RiCloseLargeLine } from "react-icons/ri";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
function ViewBlog({ blog, onClose }) {
    const date = new Date(blog.dateofPost);

  // Extract the date and time separately
  const formattedDate = date.toLocaleDateString(); // Date in locale format
  const formattedTime = date.toLocaleTimeString(); // Time in locale format
  return (
    <div className="view-popup">
      <button onClick={onClose} className="close-btn">
        <RiCloseLargeLine />
      </button>
      <div className="viewpopup-content">
        <p className="fs-5 primary-color">Blog Infomation</p>
        <div className="row">
          <div className="col-lg-12 my-2">
            <div className="popup-header">
              <p>Blog Title</p>
              <h3>{blog.title}</h3>
            </div>
          </div>
          <div className="col-lg-12">
            <img src={blog.image} alt={blog.title} className="w-100 popup-image" />
          </div>
        </div>

      
        <div className="popup-header">
              <p>Blog Date & Time</p>
            <ul className="d-flex m-0 p-0 gap-5">
            <p className="fs-6"><CiCalendarDate /> Date: {formattedDate}</p>
            <p className="fs-6"><IoMdTime /> Time: {formattedTime}</p>
            </ul>

            </div>
            <div className="popup-body my-3">
            <p>Blog Description</p>
          <div
            className="popup-description"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ViewBlog;
