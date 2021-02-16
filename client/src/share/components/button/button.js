import React from "react";

import "./button.css";

const button = (props) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.clicked}
      style={props.style}
      className={`btn ${props.className}`}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default button;
