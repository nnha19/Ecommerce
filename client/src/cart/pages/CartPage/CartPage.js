import React from "react";

import Cart from "../../components/Cart/Cart";

const CartPage = (props) => {
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
      pickedQty: 4,
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
  return (
    <>
      <Cart cartItems={cartItems} />
    </>
  );
};

export default CartPage;
