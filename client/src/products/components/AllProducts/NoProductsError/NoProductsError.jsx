import React from "react";

import "./NoProductsError.css";

import Image from "../../../../assets/error-pic.jpg";

const NoProductsError = (props) => {
  return (
    <div className="no-products-error">
      <h3>
        No products to show. <span>Please try clearing the filter fields.</span>
      </h3>
      <img src={Image} />
    </div>
  );
};

export default NoProductsError;
