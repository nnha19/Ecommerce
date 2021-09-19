import React from "react";

import "./AllProducts.css";

import { useHistory } from "react-router-dom";

const AllProducts = (props) => {
  const history = useHistory();
  let allProductsOutput;
  if (props.allProducts && props.allProducts.length > 0) {
    const navigateToProductDetailHandler = (url) => {
      history.push(url);
    };
    allProductsOutput = props.allProducts.map((product, i) => {
      let stock = product.features.inStock > 0 ? "In Stock" : "Out Of Stock";
      return (
        <div
          onClick={() =>
            navigateToProductDetailHandler(`/product/${product._id}`)
          }
          key={product._id}
          className="product"
        >
          <span className="product__stock">{stock}</span>
          <img
            className="product__img"
            src={`${process.env.REACT_APP_BACKEND_URL}/${product.imgs[0]}`}
            alt="img"
          />
          <div className="product__body">
            <h3 className="product__brand">{product.brand}</h3>
            <p className="product__price">{product.price} $</p>
          </div>
        </div>
      );
    });
  } else {
    allProductsOutput = null;
  }

  return (
    <>
      <h4 className="all-products__heading">{props.title}</h4>
      <div className="all-products">{allProductsOutput}</div>
    </>
  );
};

export default AllProducts;
