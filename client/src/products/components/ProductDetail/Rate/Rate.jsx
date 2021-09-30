import React, { useContext, useEffect, useState } from "react";

import "./Rate.css";
import { ReviewsAndQuestionsContext } from "../../../../contexts/reviewsAndQuestionsContext";
import axios from "axios";
import Context from "../../../../contexts/context";
import { useParams } from "react-router";
import {
  disableBodyScrollBar,
  enableBodyScrollBar,
} from "../../../../functions/disableBodyScrollBar";

import TextArea from "../../../../share/components/TextArea/TextArea";
import SecondaryBtn from "../../../../share/components/SecondaryBtn/SecondaryBtn";
import BackDrop from "../../../../share/UI/BackDrop/BackDrop";
import Spinner from "../../../../share/UI/Spinner/Spinner";

const Rate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { reviews, setReviews } = useContext(ReviewsAndQuestionsContext);
  const { id: productId } = useParams();
  const { curUser, toggleLogin, token } = useContext(Context);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [review, setReview] = useState("");
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

  useEffect(() => {
    showRatingForm ? disableBodyScrollBar() : enableBodyScrollBar();
  }, [showRatingForm]);

  const disabledBtn = !stars.some((star) => star === "fas fa-star");

  const rateProductHandler = async (e) => {
    setShowRatingForm(false);
    setIsLoading(true);
    e.preventDefault();
    try {
      const resp = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/product/${productId}/review`,
        method: "POST",
        data: {
          text: review,
          rating: stars.filter((rating) => rating === "fas fa-star").length,
          userId: curUser.userId,
        },
        headers: {
          authorization: token,
        },
      });
      setReviews([...reviews, resp.data]);
    } catch (err) {
      alert(err);
    }
    setIsLoading(false);
  };

  const setShowRatingFormHandler = () => {
    if (!curUser) {
      toggleLogin(true);
    } else {
      setShowRatingForm(true);
    }
  };

  return (
    <>
      <Spinner show={isLoading} />
      <button onClick={setShowRatingFormHandler} className="rate-btn">
        Rate
      </button>
      {showRatingForm && (
        <>
          <BackDrop
            backDropShow={showRatingForm}
            clicked={() => setShowRatingForm(false)}
          />
          <div className="review-container">
            <form onSubmit={rateProductHandler} className="review-form">
              <div className="review-stars">
                {stars.map((star, i) => (
                  <i
                    onMouseEnter={() => updateStarHandler(i)}
                    className={`${star}`}
                  ></i>
                ))}
              </div>
              <TextArea
                value={review}
                changeVal={(value) => setReview(value)}
                placeholder="Give us some feedback(Optional)"
              />
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
