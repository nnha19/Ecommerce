import React, { useState } from "react";

import "./ProductDetailBody.css";
import Button from "../../../../share/components/button/button";
import ProductQuantity from "../ProductDetailBody/ProductQuantity/ProductQuantity";
import { useHttp } from "../../../../customHooks/useHttp";

const ProductDetailBody = (props) => {
  const [respData, loading, error, fetchData, setRespData] = useHttp();
  const product = props.product;

  const [itemQuantity, setItemQuantity] = useState(product.pickedQty);

  const updateQuantityHandler = (type) => {
    type === "add"
      ? setItemQuantity((prev) => prev + 1)
      : setItemQuantity((prev) => prev - 1);
  };

  const addToCartHandler = () => {
    let chosenColor;
    product.colors.forEach((c) => {
      if (c.choosen) {
        chosenColor = c.color;
      }
    });

    const data = {
      brand: product.brand,
      price: product.price,
      productId: product._id,
      features: {
        gender: product.features.gender,
        inStock: product.features.inStock,
      },
      color: chosenColor,
      image: product.image,
      pickedQty: itemQuantity,
    };
    fetchData(`http://localhost:5000/cart`, "post", data);
  };

  return (
    <div className="product-detail__body">
      <p className="product-detail__price">{product.price} KS</p>
      <p>{product.description}</p>
      <div className="product-detail__cart">
        <ProductQuantity
          itemQuantity={itemQuantity}
          updateItemQuantity={(type) => updateQuantityHandler(type)}
          product={product}
        />
        <Button
          clicked={() => addToCartHandler()}
          className="product-detail__btn cart-btn"
        >
          Add To Cart
        </Button>
        <Button className="product-detail__btn checkout-btn">Checkout</Button>
      </div>
    </div>
  );
};

export default ProductDetailBody;
