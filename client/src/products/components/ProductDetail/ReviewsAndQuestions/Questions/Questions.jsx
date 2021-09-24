import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import "./Questions.css";
import axios from "axios";

const Questions = (props) => {
  const { id: productId } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    (async () => {
      const resp = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/product/${productId}/question`
      );
      setQuestions(resp.data);
    })();
  }, []);

  const qasLists =
    questions && !!questions.length ? (
      questions.map((q, i) => {
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
      })
    ) : (
      <div>
        <p>No Questions here. Ask one.</p>
      </div>
    );
  return <div className="qas">{qasLists}</div>;
};

export default Questions;
