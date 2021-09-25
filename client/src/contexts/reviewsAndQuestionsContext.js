import { createContext, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

export const ReviewsAndQuestionsContext = createContext();

const ReviewsAndQuestionsProvider = ({ children, questions, setQuestions }) => {
  const { id: productId } = useParams();
  useEffect(() => {
    //fetch questions of a specific product
    (async () => {
      const resp = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/product/${productId}/question`
      );
      setQuestions(resp.data);
    })();
  }, [productId]);
  return (
    <ReviewsAndQuestionsContext.Provider value={{ questions, setQuestions }}>
      {children}
    </ReviewsAndQuestionsContext.Provider>
  );
};

export default ReviewsAndQuestionsProvider;
