import React from "react";

import "./CustomerOrder.css";

import OrderOutput from "./OrderOutput/OrderOutput";

const CustomerOrder = (props) => {
  let output;
  if (props.error) {
    output = <div className="orders__error">{props.error}</div>;
  } else {
    output = (
      <div className="table-container">
        <table className="table">
          <tr>
            <th>Order Id</th>
            <th>Status</th>
            <th>Items</th>
            <th>Total Price</th>
            <th>Order Date</th>
          </tr>
          {props.order.map((order, index) => (
            <OrderOutput order={order} index={index} />
          ))}
        </table>
      </div>
    );
  }
  return <div className="orders">{output}</div>;
};

export default CustomerOrder;
