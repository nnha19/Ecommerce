import React from "react";

import BackDrop from "../../../../share/UI/BackDrop/BackDrop";
import TextArea from "../../../../share/components/TextArea/TextArea";
import SecondaryBtn from "../../../../share/components/SecondaryBtn/SecondaryBtn";

const QuestionForm = ({
  showForm,
  setShowForm,
  postQuestion,
  inputVal,
  changeVal,
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
            <h4>Ask question about this product</h4>
            <i onClick={() => setShowForm(false)} className="fas fa-times"></i>
          </div>
          <form
            onSubmit={(e) => postQuestion(e, showForm)}
            className="question-form"
          >
            <TextArea
              value={value}
              changeVal={changeVal}
              placeholder="Your Question"
              validRules={{ required: true }}
            />
            <SecondaryBtn disabled={disabled}>
              Submit Your Question
            </SecondaryBtn>
          </form>
        </div>
      )}
    </>
  );
};
export default QuestionForm;
