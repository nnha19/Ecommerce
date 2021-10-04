import React from "react";
import Desktop from "./Desktop/Desktop";
import Mobile from "./Mobile/Mobile";

import "./Navigation.css";

const Navigation = (props) => {
  return (
    <div className="navigation">
      <Desktop />
      <Mobile />
    </div>
  );
};

export default Navigation;
