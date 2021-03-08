import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import "./Customer.css";

import Logout from "../Auth/Logout/Logout";
import Context from "../../../../../contexts/context";

const Customer = (props) => {
  const history = useHistory();
  const context = useContext(Context);

  console.log(context);

  const showDropDownHandler = () => {
    context.setShowDropDown();
  };

  const goToOrderPageHandler = () => {
    history.push(`/order/${props.curUser.userId}`);
  };

  return (
    <li onClick={showDropDownHandler} className="customer">
      <span className="customer__username">{props.curUser.username[0]}</span>
      {context.showDropDown && (
        <div className="customer__modal">
          <ul className="customer__lists">
            <li onClick={goToOrderPageHandler} className="customer__list">
              Your orders
            </li>
            <Logout />
            <li className="customer__list account">
              Sign in as <strong>{props.curUser.username}</strong>
            </li>
          </ul>
        </div>
      )}
    </li>
  );
};

export default Customer;
