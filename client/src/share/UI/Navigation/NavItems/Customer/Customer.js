import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import "./Customer.css";

import Logout from "../Auth/Logout/Logout";
import Context from "../../../../../contexts/context";
import CustomerAvatar from "../../../CustomerAvatar/CustomerAvatar";

const Customer = (props) => {
  const history = useHistory();
  const context = useContext(Context);

  const showDropDownHandler = (e) => {
    !e.target.classList.contains("customer__list") &&
      context.setShowDropDown(true);
  };

  const hideDropDownHandler = () => {
    context.setShowDropDown(false);
  };

  const goToOrderPageHandler = () => {
    history.push(`/order/${context.curUser.userId}`);
  };

  return (
    <li onClick={showDropDownHandler} className="customer">
      <CustomerAvatar />
      {context.showDropDown && (
        <div className="customer__modal">
          <ul onClick={hideDropDownHandler} className="customer__lists">
            <li onClick={goToOrderPageHandler} className="customer__list">
              My orders
            </li>
            <li
              onClick={() =>
                history.push(`/whilist/${[context.curUser.userId]}`)
              }
              className="customer__list"
            >
              My Whilists
            </li>
            <Logout />
            <li className="customer__list account">
              Sign in as <strong>{context.curUser.username}</strong>
            </li>
          </ul>
        </div>
      )}
    </li>
  );
};

export default Customer;
