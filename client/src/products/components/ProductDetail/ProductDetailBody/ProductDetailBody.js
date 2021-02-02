import React, { useState } from "react";

import "./ProductDetailBody.css";
import Button from "../../../../share/components/button/button";
import ProductQuantity from "../ProductDetailBody/ProductQuantity/ProductQuantity";

const ProductDetailBody = (props) => {
  const product = props.product;
  return (
    <div className="product-detail__body">
      <p className="product-detail__price">{product.price} KS</p>
      <p>{product.description}</p>
      <div className="product-detail__cart">
        <ProductQuantity product={product} />
        <Button className="product-detail__btn cart-btn">Add To Cart</Button>
        <Button className="product-detail__btn checkout-btn">Checkout</Button>
      </div>
    </div>
  );
};

export default ProductDetailBody;
