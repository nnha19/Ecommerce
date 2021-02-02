import React from "react";

import ProductQuantity from "../../../products/components/ProductDetail/ProductDetailBody/ProductQuantity/ProductQuantity";
import CartItemUpdate from "../Cart/CartItemUpdate/CartItemUpdate";

import "./Cart.css";
const Cart = (props) => {
  const cartItems = [
    {
      onSale: {
        sale: false,
      },
      features: {
        gender: "male",
        cashOnDelivery: "Available",
        inStock: 20,
        size: 54,
        warranty: "Not included",
        return: "7 days return available",
        brand: "Ray Ban",
      },
      _id: "6018e3b295469a209cb68724",
      brand: "Ray Ban",
      price: "99000",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in",
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c3VuZ2xhc3Nlc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      colors: [
        {
          _id: "6018e3b295469a209cb68725",
          color: "blue",
          choosen: false,
        },
        {
          _id: "6018e3b295469a209cb68726",
          color: "green",
          choosen: false,
        },
        {
          _id: "6018e3b295469a209cb68727",
          color: "brown",
          choosen: true,
        },
      ],
      __v: 0,
    },
  ];
  const cartItemsOutput = cartItems.map((item) => {
    return (
      <div className="cart__item">
        <div className="cart__item-about">
          <img className="cart__item-img" src={item.image} />
          <div className="cart__item-features">
            <h4 className="cart__item-name">
              {item.brand}/{item.features.gender}
            </h4>
            <p className="cart__item-price">{item.price} KS</p>
            <p className="cart__item-instock">
              {item.features.inStock} instock
            </p>
          </div>
        </div>
        <ProductQuantity product={item} />
        <CartItemUpdate />
      </div>
    );
  });
  return (
    <div className="cart-container">
      <div className="cart">{cartItemsOutput}</div>
    </div>
  );
};

export default Cart;
