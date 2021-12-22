import React from "react";

import "./CustomerOrder.css";

import OrderOutput from "./OrderOutput/OrderOutput";

const CustomerOrder = (props) => {
  let output;
  if (props.error) {
    output = <div className="orders__error">{props.error}</div>;
  } else {
    output = (
      <table className="table">
        <tr>
          <th>Order Id</th>
          <th>Status</th>
          <th>Address</th>
          <th>Items</th>
          <th>Total Price</th>
          <th>Order Date</th>
        </tr>
        {props.order.map((order) => (
          <OrderOutput order={order} />
        ))}
      </table>
    );
  }
  return <div className="orders">{output}</div>;
};

export default CustomerOrder;
