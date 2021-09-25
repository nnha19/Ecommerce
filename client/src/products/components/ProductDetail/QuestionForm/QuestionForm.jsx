import React from "react";

import "./QuestionForm.css";

import BackDrop from "../../../../share/UI/BackDrop/BackDrop";
import TextArea from "../../../../share/components/TextArea/TextArea";
import SecondaryBtn from "../../../../share/components/SecondaryBtn/SecondaryBtn";

const QuestionForm = ({
  showForm,
  setShowForm,
  postQuestion,
  inputVal,
  changeVal,
  answer,
}) => {
  const disabled = inputVal.question
    ? inputVal.question.error
    : inputVal.answer.error;
  const value = inputVal.question
    ? inputVal.question.value
    : inputVal.answer.value;
  return (
    <>
      <BackDrop clicked={() => setShowForm(false)} backDropShow={showForm} />
      {showForm && (
        <div className="question-form-container">
          <div className="question-form__header">
            <h4>
              {!answer ? "Ask question about this product" : "Answer question"}
            </h4>
            <i onClick={() => setShowForm(false)} className="fas fa-times"></i>
          </div>
          {answer && (
            <h4 className="question">
              <span>Question</span> {showForm.question.q}
            </h4>
          )}
          <form
            onSubmit={(e) => postQuestion(e, showForm)}
            className="question-form"
          >
            <TextArea
              value={value}
              changeVal={changeVal}
              placeholder={!answer ? "Your Question" : "You Answer"}
              validRules={{ required: true }}
            />
            <SecondaryBtn disabled={disabled}>
              {!answer ? "Submit Your Question" : "Submit Your Answer"}
            </SecondaryBtn>
          </form>
        </div>
      )}
    </>
  );
};
export default QuestionForm;
