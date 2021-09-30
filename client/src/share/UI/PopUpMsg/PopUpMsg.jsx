import React from "react";

import "./PopUpMsg.css";

const PopUpMsg = ({ className, children, style }) => {
  return (
    <div style={style} className={`${className} popup-msg`}>
      <p>{children}</p>
    </div>
  );
};

export default PopUpMsg;
