import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams hook

function UpdateFaq() {
  const { id } = useParams(); // Extract the 'id' from the URL parameters
  const navigate = useNavigate()
  const dustytoken = useSelector((state) => state.auth.token); // Get the token from Redux store
  const token = dustytoken.replace(/^"|"$/g, ""); // Clean up token
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    answerWrittenBy: "",
  });

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        if (!id) {
          console.error("No FAQ ID provided");
          setLoading(false);
          return;
        }

        // Fetching a single FAQ by its ID
        const response = await axios.get(
          `http://localhost:8000/api/getfaq/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("data of faq", response.data.faq);
        const singlefaq = response.data.faq;
        // Set the form data with the fetched FAQ
        if (response.data) {
          setFormData({
            question: singlefaq.question,
            answer: singlefaq.answer,
            answerWrittenBy: singlefaq.answerWrittenBy,
          });
        } else {
          console.error("FAQ with the given id not found.");
        }
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqData();
  }, [id, token]);

  // Handle form submission for updating the FAQ
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/faq-update/${id}`, // PATCH API endpoint for updating
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("FAQ updated:", response.data);
      navigate("/dashboard/faq")
    } catch (error) {
      console.error("There was an error updating the FAQ:", error);
    }
  };

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
        <p>Loading FAQ...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="sr">
        <form
          className="row g-3 needs-validation"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="col-lg-12">
            <div className="row">
              <div className="col-md-12 my-2">
                <label
                  htmlFor="faqQuestion"
                  className="form-label fw-bold fs-5"
                >
                  Question
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="faqQuestion"
                  name="question"
                  placeholder="Enter the FAQ question"
                  value={formData.question}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-12 my-2">
                <label htmlFor="faqAnswer" className="form-label fw-bold fs-5">
                  Answer
                </label>
                <textarea
                  className="form-control"
                  id="faqAnswer"
                  name="answer"
                  rows="5"
                  placeholder="Provide the answer to the question"
                  value={formData.answer}
                  onChange={handleChange}
                  style={{ minHeight: "150px" }}
                  required
                />
              </div>

              <div className="col-md-4 my-2">
                <label
                  htmlFor="answerWrittenBy"
                  className="form-label fw-bold fs-5"
                >
                  Answer Written By
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="answerWrittenBy"
                  name="answerWrittenBy"
                  placeholder="Enter the author's name"
                  value={formData.answerWrittenBy}
                  onChange={handleChange}
                  required
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

export default UpdateFaq;
