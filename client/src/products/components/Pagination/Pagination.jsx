import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import Context from "../../../contexts/context";

import "./Pagination.css";

const Pagination = ({ allProducts, setResultProducts }) => {
  const { topRef } = useContext(Context);
  console.log(topRef);

  const history = useHistory();
  const curPage = parseInt(useParams().curPage) || 1;
  const contentPerPage = 5;
  const totalPages = Math.ceil(allProducts.length / contentPerPage);

  const navigateHandler = (type) => {
    topRef.current.scrollIntoView({
      behavior: "smooth",
    });
    history.push(`/products/${type === "next" ? curPage + 1 : curPage - 1}`);
  };

  useEffect(() => {
    const start = (curPage - 1) * contentPerPage;
    const end = curPage * contentPerPage;
    setResultProducts(allProducts.slice(start, end));
  }, [curPage]);

  return (
    <div className="pagination">
      <button disabled={curPage === 1} onClick={() => navigateHandler("prev")}>
        <i class="fas fa-long-arrow-alt-left"></i>Prev
      </button>
      <span className="pagination__display">
        {curPage}/{totalPages}
      </span>
      <button
        disabled={curPage === totalPages}
        onClick={() => navigateHandler("next")}
      >
        <i class="fas fa-long-arrow-alt-right"></i>Next
      </button>
    </div>
  );
};

export default Pagination;
