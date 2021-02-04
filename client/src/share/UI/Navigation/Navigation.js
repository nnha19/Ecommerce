import React from "react";
import Desktop from "./Desktop/Desktop";

const Navigation = (props) => {
  return (
    <div>
      <Desktop cartItemAmount={props.cartItemAmount} />
    </div>
  );
};

export default Navigation;
