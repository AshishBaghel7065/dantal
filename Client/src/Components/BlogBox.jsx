import React from 'react';

function BlogBox({ blog }) {
  const truncateText = (text, charLimit) => {
    if (text.length > charLimit) {
      return text.substring(0, charLimit) + "..."; // Add ellipsis if truncated
    }
    return text;
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString); // Convert to Date object
    return date.toISOString().split('T')[0]; // Get only the date part
  };


  
  return (
    <div className="blog-box">
      <div className="image-container">
        <img src="/doctor.jpeg" alt="Doctor" />
      </div>
      <div className="date">
        <p>{formatDate(blog.dateofPost)}</p>
      </div>
      <div className="content">
        <h5 className='fw-bold'>{truncateText(blog.title,36)}</h5> {/* Title truncated to 20 characters */}
        <p>{truncateText(blog.description, 130)}</p> {/* Description truncated to 40 characters */}
        <button>Read More {blog.id}</button>
      </div>
    </div>
  );
}

export default BlogBox;
