import React from "react";

import "./BackDrop.css";

const BackDrop = ({ clicked, backDropShow, className }) => {
  return (
    <div
      onClick={clicked}
      className={`backdrop ${backDropShow && "backdrop-show"} ${className}`}
    ></div>
  );
};

export default BackDrop;
