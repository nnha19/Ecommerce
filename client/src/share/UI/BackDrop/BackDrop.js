import React from "react";

import "./BackDrop.css";

const BackDrop = (props) => {
  return (
    <div className={`backdrop ${props.backDropShow && "backdrop-show"}`}></div>
  );
};

export default BackDrop;
