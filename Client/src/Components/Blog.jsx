import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogBox from './BlogBox';

function Blog() {
  const [blogs, setBlogs] = useState([]); // State to store blog data
  const [loading, setLoading] = useState(true); // State to handle loading state

  useEffect(() => {
    // Fetch blog data from API
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getAllblog'); // Replace with your actual API endpoint
        setBlogs(response.data.blogs); // Store blog data in state
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false); // Set loading to false after API call completes
      }
    };

    fetchBlogs(); // Call the API on component mount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading state until data is fetched
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-10">
            <div className="row">
              {blogs.map((blog, index) => (
                <div key={index} className="col-lg-4">
                  <BlogBox blog={blog} /> {/* Pass blog data as prop */}
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            doloremque magni quasi aut? Sed, perferendis, molestias odio aliquid
            necessitatibus recusandae veniam quas beatae aperiam eius incidunt
            consequatur vel hic iure.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
