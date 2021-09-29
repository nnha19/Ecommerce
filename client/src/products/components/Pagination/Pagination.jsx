import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import Context from "../../../contexts/context";

import "./Pagination.css";

const Pagination = ({ allProducts, setAllProducts, originalProducts }) => {
  const { topRef } = useContext(Context);
  const history = useHistory();
  const curPage = parseInt(useParams().curPage) || 1;
  const contentPerPage = 5;
  const totalPages = Math.ceil(originalProducts.length / contentPerPage);

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
    setAllProducts(originalProducts.slice(start, end));
  }, [curPage]);
  console.log(allProducts);

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
