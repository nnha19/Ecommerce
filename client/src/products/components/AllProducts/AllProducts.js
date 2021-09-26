import React, { useState } from "react";

import "./AllProducts.css";
import { useHistory } from "react-router-dom";
import calOverallRating from "../../../functions/calOverallRating";

import AddToCart from "../../components/ProductDetail/ProductDetailBody/AddToCart/AddToCart";
import AddToWhilist from "../../../cart/components/Cart/AddToWhilist/AddToWhilist";
import FilterProducts from "../FilterProducts/FilterProducts";
import Pagination from "../Pagination/Pagination";

const AllProducts = ({ allProducts, style, homePage }) => {
  const [resultProducts, setResultProducts] = useState(allProducts);
  const [showFilter, setShowFilter] = useState(false);
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
  //loop through allProducts in similarProducts page. resultProducts for homePage
  const mapArr = homePage ? resultProducts : allProducts;

  allProductsOutput = mapArr.map((product, i) => {
    const overallRating = calOverallRating(product.reviews);

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
          <div className="stars">
            <span className="product__overall-rating">{overallRating}/5</span>
            <i className="rating-star fas fa-star"></i>
            <i className="rating-star fas fa-star"></i>
            <i className="rating-star fas fa-star"></i>
            <i className="rating-star fas fa-star"></i>
            <i className="rating-star fas fa-star"></i>
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

  const returnChildren = (
    <>
      {homePage && (
        <FilterProducts
          showFilter={showFilter}
          allProducts={allProducts}
          setResultProducts={setResultProducts}
          setShowFilter={setShowFilter}
        />
      )}
      <div
        style={style}
        className={`all-products ${showFilter ? "" : "order-1"}`}
      >
        {allProductsOutput}
      </div>
    </>
  );
  //if homepage is true homepage. Otherwise similar products being used from productDetail
  return homePage ? (
    <div className="all-products-container">
      <button onClick={() => setShowFilter(!showFilter)} className="filter-btn">
        <i class="fas fa-filter"></i>
        Filter
      </button>
      <div
        className={`all-products-content ${showFilter ? "" : "hidden-filter"}`}
      >
        {returnChildren}
      </div>
      <Pagination
        allProducts={allProducts}
        setResultProducts={setResultProducts}
      />
    </div>
  ) : (
    returnChildren
  );
};

export default AllProducts;
