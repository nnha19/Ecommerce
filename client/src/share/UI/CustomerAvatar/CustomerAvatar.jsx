import React, { useContext } from "react";

import "./CustomerAvatar.css";
import Context from "../../../contexts/context";

const CustomerAvatar = ({ className }) => {
  const context = useContext(Context);
  return (
    <span className={`customer__username ${className}`}>
      {context.curUser && context.curUser.username[0]}
    </span>
  );
};

export default CustomerAvatar;
