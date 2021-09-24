import React from "react";

import "./Questions.css";

const questions = [
  {
    question: { q: "Can I get this for free?", timeStamp: "2 days ago" },
    answer: { a: "No, you can't", timeStamp: "3 hours ago" },
  },
  {
    question: {
      q: "When the item is delivered and if it was damaged before arriving at my hands, how would you take responsibility for that?",
      timeStamp: "2 days ago",
    },
    answer: {
      a: "Of course, we try to ensure that never happens. But if it does happen, technically it will be the delivery's responsibility. But we will do anything we can to make sure that our customer doesn't have to lose in that case.",
      timeStamp: "3 hours ago",
    },
  },
  {
    question: { q: "Can I get this for free?", timeStamp: "2 days ago" },
    answer: { a: "No, you can't", timeStamp: "3 hours ago" },
  },
];

const Questions = (props) => {
  const qasLists = questions.map((q, i) => {
    return (
      <div key={i} className="qa">
        <p className="qa__content">
          <span className="qa__text">question</span>
          <span>{q.question.q}</span>
          <span className="qa__timestamp">({q.question.timeStamp})</span>
        </p>
        <p className="qa__content">
          <span className="qa__text">answer</span>
          <span>{q.answer.a}</span>
          <span className="qa__timestamp">({q.answer.timeStamp})</span>
        </p>
      </div>
    );
  });
  return <div className="qas">{qasLists}</div>;
};

export default Questions;
