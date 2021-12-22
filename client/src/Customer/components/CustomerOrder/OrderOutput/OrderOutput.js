import React, { useState } from "react";
import BackDrop from "../../../../share/UI/BackDrop/BackDrop";

import "./Orderoutput.css";

const OrderOutput = ({ order, index }) => {
  const [showItems, setShowItems] = useState(false);

  const orderedItemsList = order.order.item.map((item) => {
    return (
      <div className="item">
        <div className="item__detail">
          <img
            className="item__img"
            src={`${process.env.REACT_APP_BACKEND_URL}/${item.cartItem.imgs[0]}`}
          />
          <div>
            <h4>
              {item.cartItem.brand} ({item.pickedQty})
            </h4>
            <p>{item.cartItem.features.gender}</p>
            <p>{item.cartItem.price} USD</p>
          </div>
        </div>
      </div>
    );
  });

  let totalItemsCount = 0;
  order.order.item.forEach((i) => {
    totalItemsCount += i.pickedQty;
  });
  let totalPrice = order.order.item.reduce((acc, cur) => {
    return acc + cur.cartItem.price;
  }, 0);

  let orderDate = new Date(order.order.orderDate);
  orderDate = `${orderDate.getDate()}/${orderDate.getMonth()}/${orderDate.getFullYear()}`;
  return (
    <>
      <tr className={(index + 1) % 2 === 0 && "special-style"} key={order._id}>
        <td>{order._id}</td>
        <td>Shipping</td>
        <td onClick={() => setShowItems(true)} className="ordered-items">
          {totalItemsCount} items
        </td>
        <td>{totalPrice} USD</td>
        <td>{orderDate}</td>
      </tr>
      {showItems && (
        <div className="items-list">
          <h4 className="items-list__header">Ordered Items List</h4>
          {orderedItemsList}
        </div>
      )}
      <BackDrop clicked={() => setShowItems(false)} backDropShow={showItems} />
    </>
  );
};

export default OrderOutput;
