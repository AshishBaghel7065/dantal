import React from "react";
import ReviewBox from "./ReviewBox";

const CustomerReviewSection = () => {
  const reviews = [
    {
      name: "John Doe",
      review:
        "Shivaay Dental Clinic provided excellent service, and I’m very happy with the results. Highly recommend!",
    },
    {
      name: "Jane Smith",
      review:
        "The staff was incredibly helpful, and the treatment was quick and painless. I’ll definitely be back!",
    },
    {
      name: "Alice Johnson",
      review:
        "I had an amazing experience! The clinic is very clean and modern, and the staff is friendly and professional.",
    },
    {
      name: "Robert Brown",
      review:
        "Excellent care and treatment! Dr. Shiva Mani is very skilled, and the staff made me feel comfortable throughout.",
    },
    {
      name: "Emily Davis",
      review:
        "I had a great experience at Shivaay Dental Clinic. The clinic is state-of-the-art, and the team is exceptional.",
    },
    {
      name: "Michael Clark",
      review:
        "Fantastic experience! The doctors are highly skilled, and the clinic offers great customer service.",
    },
    {
      name: "Olivia Martinez",
      review:
        "Highly recommend this clinic! The treatments were effective, and the staff is very caring and professional.",
    },
  ];

  return (
    <section className="customer-review-section">
      <div className="container">
        <h2 className="text-center my-5 primary-color">Customer Reviews</h2>
        <div className="reviews-container">
          <div className="reviews-content">
            {reviews.map((review, index) => (
             <ReviewBox name={review.name} review={review.review}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviewSection;
