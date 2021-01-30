import React from "react";

import "./button.css";

const button = (props) => {
  return (
    <button style={props.style} className={`btn ${props.className}`}>
      {props.children}
    </button>
  );
};

export default button;
