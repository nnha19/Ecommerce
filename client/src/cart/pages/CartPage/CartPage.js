import React from "react";

import Cart from "../../components/Cart/Cart";

const CartPage = (props) => {
  const cartItems = [
    {
      _id: "601a3940028eed1ebce94185",
      brand: "Ray Ban",
      pickedQty: 4,
      price: "55000",
      onSale: {
        sale: true,
      },
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in",
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c3VuZ2xhc3Nlc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      colors: [
        {
          _id: "601a3940028eed1ebce94186",
          color: "blue",
          choosen: true,
        },
        {
          _id: "601a3940028eed1ebce94187",
          color: "green",
          choosen: false,
        },
        {
          _id: "601a3940028eed1ebce94188",
          color: "brown",
          choosen: false,
        },
      ],
      features: {
        gender: "female",
        cashOnDelivery: "Available",
        inStock: 12,
        size: 54,
        warranty: "Not included",
        return: "7 days return available",
        brand: "Ray Ban",
      },
    },
  ];
  return (
    <>
      <Cart cartItems={cartItems} />
    </>
  );
};

export default CartPage;
