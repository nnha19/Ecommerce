import React, { useContext } from "react";

import "./AllProducts.css";
import { useHistory } from "react-router-dom";

import AddToCart from "../../components/ProductDetail/ProductDetailBody/AddToCart/AddToCart";
import AddToWhilist from "../../../cart/components/Cart/AddToWhilist/AddToWhilist";

const AllProducts = (props) => {
  const history = useHistory();
  let allProductsOutput;
  if (props.allProducts && props.allProducts.length > 0) {
    const navigateToProductDetailHandler = (e, url) => {
      if (
        !e.target.classList.contains("product__add-to-cart") &&
        !e.target.classList.contains("backdrop") &&
        e.target.closest(".add-to-whilist-container")
      ) {
        console.log("Dont go anywhere");
      } else {
        history.push(url);
      }
    };
    allProductsOutput = props.allProducts.map((product, i) => {
      let stock = product.features.inStock > 0 ? "In Stock" : "Out Of Stock";
      return (
        <div
          onClick={(e) =>
            navigateToProductDetailHandler(e, `/product/${product._id}`)
          }
          key={product._id}
          className="product"
        >
          <AddToWhilist product={product} />
          <span className="product__stock">{stock}</span>
          <img
            className="product__img"
            src={`${process.env.REACT_APP_BACKEND_URL}/${product.imgs[0]}`}
            alt="img"
          />
          <div className="product__body">
            <h2 className="product__brand">{product.brand}</h2>
            <p className="product__price">{product.price} $</p>
            <div className="stars">
              <i class="rating-star fas fa-star"></i>
              <i class="rating-star fas fa-star"></i>
              <i class="rating-star fas fa-star"></i>
              <i class="rating-star fas fa-star"></i>
              <i class="rating-star fas fa-star"></i>
              <span>({product.reviews.length})</span>
            </div>
            <AddToCart
              className="product__add-to-cart"
              itemQuantity={1}
              product={product}
            >
              Add To Cart
            </AddToCart>
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
