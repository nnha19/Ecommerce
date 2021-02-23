import React, { useState } from "react";

import "./Customer.css";

const Customer = (props) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const showDropDownHandler = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <li onClick={showDropDownHandler} className="customer">
      <span className="customer__username">{props.username[0]}</span>
      {showDropDown && (
        <div className="customer__modal">
          <ul className="customer__lists">
            <li className="customer__list">Your orders</li>
            <li className="customer__list account">
              Sign in as <strong>{props.username}</strong>
            </li>
          </ul>
        </div>
      )}
    </li>
  );
};

export default Customer;
