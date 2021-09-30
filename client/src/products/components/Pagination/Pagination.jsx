import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import Context from "../../../contexts/context";

import "./Pagination.css";

const Pagination = ({ allProducts, setResultProducts, curPage }) => {
  const { topRef } = useContext(Context);
  const history = useHistory();
  const contentPerPage = 20;
  const totalPages = Math.ceil(allProducts.length / contentPerPage);

  const navigateHandler = (type) => {
    setTimeout(() => {
      topRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }, 200);
    history.push(`/products/${type === "next" ? curPage + 1 : curPage - 1}`);
  };

  useEffect(() => {
    const start = (curPage - 1) * contentPerPage;
    const end = curPage * contentPerPage;
    setResultProducts(allProducts.slice(start, end));
  }, [curPage, allProducts]);

  return (
    <div className="pagination">
      <button disabled={curPage === 1} onClick={() => navigateHandler("prev")}>
        <i className="fas fa-long-arrow-alt-left"></i>Prev
      </button>
      <span className="pagination__display">
        {curPage}/{totalPages}
      </span>
      <button
        disabled={curPage === totalPages}
        onClick={() => navigateHandler("next")}
      >
        <i className="fas fa-long-arrow-alt-right"></i>Next
      </button>
    </div>
  );
};

export default Pagination;
