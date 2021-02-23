import React from "react";

import "./CustomerOrder.css";

import OrderOutput from "./OrderOutput/OrderOutput";

const CustomerOrder = (props) => {
  let output;
  if (props.error) {
    output = <div className="orders__error">{props.error}</div>;
  } else {
    output = <OrderOutput order={props.order} />;
  }
  return <div className="orders">{output}</div>;
};

export default CustomerOrder;
