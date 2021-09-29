import React from "react";

import "./AllProducts.css";
import { useHistory, useParams } from "react-router-dom";

import AddToCart from "../../components/ProductDetail/ProductDetailBody/AddToCart/AddToCart";
import AddToWhilist from "../../../cart/components/Cart/AddToWhilist/AddToWhilist";
import OverallRatings from "../OverallRatings/OverallRatings";

const AllProducts = ({ allProducts, style, setCurPage }) => {
  const { curPage } = useParams();
  if (curPage) {
    setCurPage(parseInt(curPage));
  }
  const history = useHistory();
  let allProductsOutput;

  const navigateToProductDetailHandler = (e, url) => {
    if (
      e.target.classList.contains("product__add-to-cart") ||
      e.target.classList.contains("backdrop") ||
      e.target.closest(".add-to-whilist-container")
    )
      return;
    history.push(url);
  };

  allProductsOutput = allProducts.map((product, i) => {
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
          <p className="product__price">{product.price} USD</p>
          <OverallRatings reviews={product.reviews} />
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

  return (
    <div style={style} className={`all-products `}>
      {allProductsOutput}
    </div>
  );
};

export default AllProducts;
