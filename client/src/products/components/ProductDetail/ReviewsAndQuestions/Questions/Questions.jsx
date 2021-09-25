import React, { useContext } from "react";

import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";

import "./Questions.css";
import { ReviewsAndQuestionsContext } from "../../../../../contexts/reviewsAndQuestionsContext";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const Questions = () => {
  const { questions } = useContext(ReviewsAndQuestionsContext);
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
                <ReactTimeAgo date={q.question.timeStamp} locale="en-US" />
              </p>
            ) : (
              <p className="qa-no-answer">
                Admin will answer this question soon
              </p>
            )}
          </div>
        );
      })
    ) : (
      <div>
        <p>No Questions here. Ask one.</p>
      </div>
    );
  return <div className="qas">{qasLists}</div>;
};

export default Questions;
