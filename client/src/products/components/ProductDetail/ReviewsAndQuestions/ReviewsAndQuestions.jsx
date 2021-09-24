import React, { useState } from "react";
import Questions from "./Questions/Questions";
import Reviews from "./Reviews/Reviews";

import "./ReviewsAndQuestions.css";

const ReviewsAndQuestions = (props) => {
  const [activeHeader, setActiveHeader] = useState("reviews");

  const toggleHeaderHandler = (header) => {
    setActiveHeader(header);
  };

  return (
    <div className="rnq-container">
      <div className="rnq">
        <h2
          onClick={() => toggleHeaderHandler("reviews")}
          id={activeHeader === "reviews" ? "rnq-active" : ""}
        >
          Reviews
        </h2>
        <h2
          onClick={() => toggleHeaderHandler("questions")}
          id={activeHeader === "questions" ? "rnq-active" : ""}
        >
          Questions
        </h2>
      </div>
      {activeHeader === "reviews" ? <Reviews /> : <Questions />}
    </div>
  );
};

export default ReviewsAndQuestions;
