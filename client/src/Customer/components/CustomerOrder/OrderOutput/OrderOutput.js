import React from "react";

import "./Orderoutput.css";

const OrderOutput = ({ order }) => {
  console.log(order);
  return (
    <div className="order">
      <h1 className="orders__header">Your Orders</h1>
      <div className="container">
        <table className="table">
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Address</th>
            <th>Items</th>
            <th>Total Price</th>
            <th>Order Date</th>
          </tr>
          <tbody>
            <tr>
              <td>Myemail@gmail.com</td>
              <td>Shipping</td>
              <td>Address</td>
              <td>Items</td>
              <td>2900 USD</td>
              <td>12/3/2001</td>
            </tr>
            <tr>
              <td>Myemail@gmail.com</td>
              <td>Shipping</td>
              <td>Address</td>
              <td>Items</td>
              <td>2900 USD</td>
              <td>12/3/2001</td>
            </tr>
            <tr>
              <td>Myemail@gmail.com</td>
              <td>Shipping</td>
              <td>Address</td>
              <td>Items</td>
              <td>2900 USD</td>
              <td>12/3/2001</td>
            </tr>
            <tr>
              <td>Myemail@gmail.com</td>
              <td>Shipping</td>
              <td>Address</td>
              <td>Items</td>
              <td>2900 USD</td>
              <td>12/3/2001</td>
            </tr>
            <tr>
              <td>Myemail@gmail.com</td>
              <td>Shipping</td>
              <td>Address</td>
              <td>Items</td>
              <td>2900 USD</td>
              <td>12/3/2001</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderOutput;
