import React, { useEffect, useState } from "react";
import axios from "axios";
const FaqSection = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getAllfaq'); // Replace with your actual API URL
        setFaqs(response.data.faqs);

      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);
 

  return (
    <section className="faq-section pad-30 ubuntu-light">
      <div className="container">
        <div className="row">
        <div className="col-lg-6">
            <div className="py-5">
              <h1 className="text-center primary-color">
                ( FAQ ) Frequently Asked Questions
              </h1>
              <p className="secondary-color">
                At Shivaay Dental Clinic, we strive to answer all your questions about our services and treatments. Here are some frequently asked questions.
              </p>
              <p className="secondary-color">
                We are committed to providing the best dental care experience for you and your family. If you have any other questions, feel free to contact us directly. We're here to help!
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="accordion accordion-flush" id="accordionFlushExample">
              {faqs.map((faq, index) => (
                <div className="accordion-item" key={index}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#flush-collapse${index}`}
                      aria-expanded="false"
                      aria-controls={`flush-collapse${index}`}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={`flush-collapse${index}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
