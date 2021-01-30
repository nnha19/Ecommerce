import React from "react";

import "./ProductDetail.css";

import Button from "../../../share/components/button/button";

const ProductDetail = (props) => {
  const product = props.productDetail;
  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-detail__img-container">
          <img src={product.image} />
        </div>
        <div className="product-detail__body">
          <p className="product-detail__price">{product.price} KS</p>
          <p>{product.description}</p>
          <div className="product-detail__cart">
            <div className="product-detail__quantity">
              <span>Quantity</span>
              <i class="fas fa-plus"></i>
              <span>1</span>
              <i class="fas fa-minus"></i>
            </div>
            <Button className="product-detail__btn cart">Add To Cart</Button>
            <Button className="product-detail__btn checkout">Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
