import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import "./Customer.css";

import Logout from "../Auth/Logout/Logout";

const Customer = (props) => {
  const history = useHistory();
  const [showDropDown, setShowDropDown] = useState(false);

  const showDropDownHandler = () => {
    setShowDropDown(!showDropDown);
  };

  const goToOrderPageHandler = () => {
    history.push(`/order/${props.curUser.userId}`);
  };

  return (
    <li onClick={showDropDownHandler} className="customer">
      <span className="customer__username">{props.curUser.username[0]}</span>
      {showDropDown && (
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
