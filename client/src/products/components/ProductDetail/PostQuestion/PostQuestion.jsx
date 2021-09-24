import React, { useContext, useState } from "react";
import "./PostQuestion.css";
import axios from "axios";

import SecondaryBtn from "../../../../share/components/SecondaryBtn/SecondaryBtn";
import TextArea from "../../../../share/components/TextArea/TextArea";
import BackDrop from "../../../../share/UI/BackDrop/BackDrop";
import { useParams } from "react-router";
import Context from "../../../../contexts/context";

const PostQuestion = (props) => {
  const context = useContext(Context);
  const { userId } = context.curUser;
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
      if (resp.status === 200) {
        setShowForm(false);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <button onClick={showQuestionFormHandler} className="post-question__btn">
        Post Question
      </button>
      <BackDrop clicked={() => setShowForm(false)} backDropShow={showForm} />
      {showForm && (
        <div className="question-form-container">
          <div className="question-form__header">
            <h4>Ask question about this product</h4>
            <i onClick={() => setShowForm(false)} className="fas fa-times"></i>
          </div>
          <form onSubmit={postQuestionHandler} className="question-form">
            <TextArea
              value={questionInput.value}
              changeVal={changeValHandler}
              placeholder="Your Question"
              validRules={{ required: true }}
            />
            <SecondaryBtn disabled={questionInput.question.error}>
              Submit Your Question
            </SecondaryBtn>
          </form>
        </div>
      )}
    </>
  );
};

export default PostQuestion;
