import React, { useEffect, useState } from "react";

import "./Rate.css";

import TextArea from "../../../../share/components/TextArea/TextArea";
import SecondaryBtn from "../../../../share/components/SecondaryBtn/SecondaryBtn";
import BackDrop from "../../../../share/UI/BackDrop/BackDrop";

const Rate = (props) => {
  const [showRatingForm, setShowRatingForm] = useState(false);

  const [review, setReview] = useState({});
  const [stars, setStars] = useState([]);

  const updateStarHandler = (id) => {
    const updatedStars = [];
    for (let i = 0; i < id + 1; i++) {
      updatedStars.push("fas fa-star");
    }
    while (updatedStars.length < 5) {
      updatedStars.push("far fa-star");
    }
    setStars(updatedStars);
  };

  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push("far fa-star");
    }
    setStars(stars);
  }, []);

  const disabledBtn = !stars.some((star) => star === "fas fa-star");

  return (
    <>
      <button onClick={() => setShowRatingForm(true)} className="rate-btn">
        Rate
      </button>
      {showRatingForm && (
        <>
          <BackDrop
            backDropShow={showRatingForm}
            clicked={() => setShowRatingForm(false)}
          />
          <div className="review-container">
            <form className="review-form">
              <div className="review-stars">
                {stars.map((star, i) => (
                  <i
                    onMouseEnter={() => updateStarHandler(i)}
                    className={`${star}`}
                  ></i>
                ))}
              </div>
              <TextArea placeholder="Give us some feedback(Optional)" />
              <SecondaryBtn
                disabled={disabledBtn}
                style={{ marginTop: "1rem", background: "purple" }}
              >
                Submit
              </SecondaryBtn>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Rate;
