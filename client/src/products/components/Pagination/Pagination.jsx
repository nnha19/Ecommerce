import React from "react";

import "./Pagination.css";

const Pagination = ({ resultProducts, setResultProducts }) => {
  return (
    <div className="pagination">
      <button>
        <i class="fas fa-long-arrow-alt-left"></i>Prev
      </button>
      <span className="pagination__display">1/4</span>
      <button>
        <i class="fas fa-long-arrow-alt-right"></i>Next
      </button>
    </div>
  );
};

export default Pagination;
