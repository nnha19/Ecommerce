import React from "react";

import "./Orderoutput.css";

const OrderOutput = ({ order }) => {
  const oderList = order.map((o) => {
    return (
      <tr key={o._id}>
        <td>{o._id}</td>
        <td>Shipping</td>
        <td>Address</td>
        <td>Items</td>
        <td>2900 USD</td>
        <td>12/3/2001</td>
      </tr>
    );
  });
  return (
    <div className="order">
      <h1 className="orders__header">Your Orders</h1>
      <div className="container">
        <table className="table">
          <tr>
            <th>Order Id</th>
            <th>Status</th>
            <th>Address</th>
            <th>Items</th>
            <th>Total Price</th>
            <th>Order Date</th>
          </tr>
          <tbody>{oderList}</tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderOutput;
