import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function AddFaq() {
  const dustytoken = useSelector((state) => state.auth.token); // Get the token from Redux store
  const token = dustytoken.replace(/^"|"$/g, ""); // Clean up token
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    answerWrittenBy: "",
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Additional client-side validation (optional)
    if (!formData.question.trim() || !formData.answer.trim() || !formData.answerWrittenBy.trim()) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/faq-create", // Replace with your API endpoint
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("FAQ added:", response.data);

      // Reset form fields after successful submission
      setFormData({
        question: "",
        answer: "",
        answerWrittenBy: "",
      });
    } catch (error) {
      console.error("There was an error adding the FAQ!", error);
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

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
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="sr">
        <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
          <div className="col-lg-12">
            <div className="row">
              {/* Question Field */}
              <div className="col-md-12 my-2">
                <label htmlFor="faqQuestion" className="form-label fw-bold fs-5">
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

              {/* Answer Field */}
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

              {/* Answer Written By Field */}
              <div className="col-md-4 my-2">
                <label htmlFor="answerWrittenBy" className="form-label fw-bold fs-5">
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
            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFaq;
