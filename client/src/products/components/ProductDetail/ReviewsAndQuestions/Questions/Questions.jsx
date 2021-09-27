import React, { useContext, useState } from "react";

import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import "./Questions.css";
import { ReviewsAndQuestionsContext } from "../../../../../contexts/reviewsAndQuestionsContext";
import Context from "../../../../../contexts/context";
import axios from "axios";
import { useParams } from "react-router";
import ErrorMsg from "../../../../../share/components/ErrorMsg/ErrorMsg";
import PostQuestion from "../../PostQuestion/PostQuestion";

import SecondaryBtn from "../../../../../share/components/SecondaryBtn/SecondaryBtn";
import QuestionForm from "../../QuestionForm/QuestionForm";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const Questions = () => {
  const { questions, setQuestions } = useContext(ReviewsAndQuestionsContext);
  const { curUser, token } = useContext(Context);
  const { id: productId } = useParams();
  const [answerQuestionForm, setAnswerQuestionForm] = useState(false);
  const [answerInputVal, setAnswerInputVal] = useState({
    answer: {
      value: "",
      error: true,
    },
  });

  const postAnswerHandler = async (e, q) => {
    e.preventDefault();
    try {
      const answer = answerInputVal.answer.value;
      const resp = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/product/${productId}/question`,
        data: {
          answer,
          qid: q._id,
        },
        method: "POST",
        headers: {
          Authorization: token,
        },
      });
      const updatedQuestion = [...questions];
      const updatedQuestions = updatedQuestion.map((q) => {
        if (q._id.toString() === answerQuestionForm._id.toString()) {
          return resp.data;
        } else {
          return q;
        }
      });
      setAnswerQuestionForm(false);
      setQuestions(updatedQuestions);
    } catch (err) {
      alert(err);
    }
  };

  const changeValHandler = (value, error) => {
    setAnswerInputVal({ ...answerInputVal, answer: { value, error } });
  };

  let noAnswer;
  if (curUser && curUser.admin) {
    noAnswer = (q) => (
      <>
        <SecondaryBtn
          clicked={() => setAnswerQuestionForm(q)}
          style={{ width: "8rem", borderRadius: "9px" }}
        >
          Answer
        </SecondaryBtn>
        <QuestionForm
          type="answer"
          showForm={answerQuestionForm}
          setShowForm={setAnswerQuestionForm}
          postQuestion={postAnswerHandler}
          inputVal={answerInputVal}
          changeVal={changeValHandler}
          answer={true}
        />
      </>
    );
  } else {
    noAnswer = () => (
      <p className="qa-no-answer">Admin will answer this question soon</p>
    );
  }

  const qasLists =
    questions && !!questions.length ? (
      questions.map((q, i) => {
        return (
          <div key={i} className="qa">
            <p className="qa__content">
              <span className="qa__text">question</span>
              <span>{q.question.q}</span>
              <ReactTimeAgo date={q.question.timeStamp} locale="en-US" />
            </p>
            {q.answer ? (
              <p className="qa__content">
                <span className="qa__text">answer</span>
                <span>{q.answer.a}</span>
                <ReactTimeAgo date={q.answer.timeStamp} locale="en-US" />
              </p>
            ) : (
              noAnswer(q)
            )}
          </div>
        );
      })
    ) : (
      <ErrorMsg
        error={
          <div>
            <p>No Questions.</p>
            <PostQuestion />
          </div>
        }
      />
    );
  return <div className="qas">{qasLists}</div>;
};

export default Questions;
