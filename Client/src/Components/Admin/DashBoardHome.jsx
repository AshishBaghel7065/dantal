import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaRegComments, FaRegNewspaper, FaRegQuestionCircle, FaAddressBook } from "react-icons/fa";

function DashBoardHome() {
  const [loading, setLoading] = useState(true);
  const [countService, setCountService] = useState(0);
  const [countBlog, setCountBlog] = useState(0);
  const [countFaq, setCountFaq] = useState(0);
  const [countContact, setCountContact] = useState(0);

  const dustytoken = useSelector((state) => state.auth.token); // Get the token from Redux store
  const token = dustytoken.replace(/^"|"$/g, "");

  // Fetch data from multiple APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [serviceResponse, blogResponse, faqResponse, contactResponse] =
          await Promise.all([
            axios.get("http://localhost:8000/api/getAllservice", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get("http://localhost:8000/api/getAllblog", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get("http://localhost:8000/api/getAllfaq", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get("http://localhost:8000/api/getAllcontact", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

        // Setting the counts for each category
        setCountService(serviceResponse.data.data.length);
        setCountBlog(blogResponse.data.blogs.length);
        setCountFaq(faqResponse.data.faqs.length);
        setCountContact(contactResponse.data.length);
      } catch (error) {
        console.error("Error fetching data from APIs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const data = [
    { count: countBlog, label: "Blog Post", icon: <FaRegComments /> },
    { count: countService, label: "Services", icon: <FaRegNewspaper /> },
    { count: countFaq, label: "FAQs", icon: <FaRegQuestionCircle /> },
    { count: countContact, label: "Contacts", icon: <FaAddressBook /> },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <div className="spinner-border" role="status" />
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <section className="p-0 p-lg-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="row gap-4">
              {data.map((item, index) => (
                <div key={index} className="col-lg-5">
                  <div className="count-box">
                    <div className="count-icon">
                      <p>{item.label}</p>
                      <p>{item.icon}</p>
                    </div>
                    <h1>{item.count}</h1>
                    <p>Total {item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashBoardHome;
