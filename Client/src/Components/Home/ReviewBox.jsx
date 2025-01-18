import React from "react";

function ReviewBox({name , image , review}) {
  return (
    <div className="review-box">
      <p className="review-text">"{review}"</p>
      <p className="review-author">{name}</p>
    </div>
  );
}

export default ReviewBox;
