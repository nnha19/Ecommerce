import React from "react";

import "./Desktop.css";
import NavItems from "../NavItems/NavItems";

const Desktop = (props) => {
  return (
    <ul className="nav">
      <NavItems cartItemAmount={props.cartItemAmount} />
    </ul>
  );
};

export default Desktop;
