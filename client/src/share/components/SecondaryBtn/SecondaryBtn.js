import React from "react";

import "./SecondaryBtn.css";

const SecondaryBtn = (props) => {
  return (
    <button
      onClick={props.clicked}
      style={props.style}
      className={`secondary-btn ${props.className}`}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default SecondaryBtn;
