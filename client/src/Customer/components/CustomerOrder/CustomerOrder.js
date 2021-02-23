import React from "react";

import "./CustomerOrder.css";

const CustomerOrder = (props) => {
  let output;
  if (props.error) {
    output = <div className="orders__error">{props.error}</div>;
  } else {
    output = <div>Orders</div>;
  }
  return <div className="orders">{output}</div>;
};

export default CustomerOrder;
