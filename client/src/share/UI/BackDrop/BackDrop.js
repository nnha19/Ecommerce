import React from "react";

import "./BackDrop.css";

const BackDrop = (props) => {
  return (
    <div
      onClick={props.clicked}
      className={`backdrop ${props.backDropShow && "backdrop-show"}`}
    ></div>
  );
};

export default BackDrop;
