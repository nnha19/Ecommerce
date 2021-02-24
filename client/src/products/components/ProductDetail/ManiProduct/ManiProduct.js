import React, { useState } from "react";

import "./ManiProduct.css";

const ManiProduct = (props) => {
  const editProductHandler = () => {};

  const deleteWarningHandler = () => {};

  return (
    <div onClick={props.showDropDownHandler} className="mani-product-container">
      <div className="mani-product">
        <span className="mani-product__btn"></span>
      </div>
      <div
        className={`${
          props.showDropDown ? "drop-down show-dropdown" : "drop-down"
        }`}
      >
        <div onClick={editProductHandler} className="drop-down__items edit">
          Edit
        </div>
        <div onClick={deleteWarningHandler} className="drop-down__items delete">
          Delete
        </div>
      </div>
    </div>
  );
};

export default ManiProduct;
