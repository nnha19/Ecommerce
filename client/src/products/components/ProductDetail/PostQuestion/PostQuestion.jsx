import React, { useContext, useEffect, useState } from "react";
import "./PostQuestion.css";
import axios from "axios";

import { useParams } from "react-router";
import Context from "../../../../contexts/context";
import { ReviewsAndQuestionsContext } from "../../../../contexts/reviewsAndQuestionsContext";
import QuestionForm from "../QuestionForm/QuestionForm";
import Spinner from "../../../../share/UI/Spinner/Spinner";
import PopUpMsg from "../../../../share/UI/PopUpMsg/PopUpMsg";

const PostQuestion = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const context = useContext(Context);
  const { userId } = context;
  const { setQuestions, questions } = useContext(ReviewsAndQuestionsContext);
  const { id: productId } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [questionInput, setQuestionInput] = useState({
    question: { value: "", error: true },
  });
  const showQuestionFormHandler = () => {
    setShowForm(true);
  };

  const changeValHandler = (value, error) => {
    setQuestionInput({ ...questionInput, question: { value, error } });
  };

  const postQuestionHandler = async (e) => {
    setShowForm(false);
    setIsLoading(true);
    e.preventDefault();
    try {
      const resp = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/product/${productId}/question`,
        method: "POST",
        data: {
          question: questionInput.question.value,
          userId,
        },
      });
      setQuestions([...questions, resp.data]);
      if (resp.status === 200) {
        setQuestionSubmitted(true);
      }
    } catch (err) {
      alert(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (questionSubmitted) {
      setTimeout(() => {
        setQuestionSubmitted(false);
      }, 2000);
    }
  }, [questionSubmitted]);

  return (
    <>
      <Spinner show={isLoading} />
      <button onClick={showQuestionFormHandler} className="post-question__btn">
        Post Question
      </button>
      {questionSubmitted && (
        <PopUpMsg>You question has been submitted successfully.</PopUpMsg>
      )}

      <QuestionForm
        postQuestion={postQuestionHandler}
        showForm={showForm}
        setShowForm={setShowForm}
        inputVal={questionInput}
        changeVal={changeValHandler}
      />
    </>
  );
};

export default PostQuestion;
