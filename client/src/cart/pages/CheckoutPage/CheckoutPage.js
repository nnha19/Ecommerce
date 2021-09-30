import React from "react";

import Checkout from "../../components/Checkout/Checkout";

const CheckoutPage = (props) => {
  document.title = "Checkout";
  return (
    <>
      <Checkout />
    </>
  );
};

export default CheckoutPage;
