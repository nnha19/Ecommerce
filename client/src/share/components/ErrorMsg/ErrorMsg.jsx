import React from "react";

import "./ErrorMsg.css";

const ErrorMsg = ({ error }) => {
  return <div className="error-msg-container">{error}</div>;
};

export default ErrorMsg;
