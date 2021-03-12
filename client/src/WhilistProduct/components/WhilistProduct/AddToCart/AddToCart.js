import React from "react";

const AddToCart = (props) => {
  return (
    <>
      <span>+</span>
      <i
        style={{ color: "green", fontSize: "1.2rem" }}
        className="fas fa-shopping-cart"
      ></i>
    </>
  );
};

export default AddToCart;
