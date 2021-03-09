import React from "react";

import "./AllProducts.css";

import { Link } from "react-router-dom";

const AllProducts = (props) => {
  let allProductsOutput;
  if (props.allProducts && props.allProducts.length > 0) {
    allProductsOutput = props.allProducts.map((product, i) => {
      return (
        <div key={product._id} className="product">
          <Link
            to={`/product/${product._id}`}
            className="product__detail-link"
            href="#"
          >
            <img className="product__img" src={product.image} alt="img" />
            <div className="product__body">
              <h3 className="product__brand">{product.brand}</h3>
              <p className="product__price">{product.price}</p>
            </div>
          </Link>
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
