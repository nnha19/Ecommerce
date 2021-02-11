import React from "react";

import { Link } from "react-router-dom";
import "./ErrorMsg.css";

const ErrorMsg = (props) => {
  let errorMsgOutput;
  if (props.errorMsg) {
    errorMsgOutput = (
      <div className="error">
        <p className="error__msg">{props.errorMsg}</p>
        {props.action && <Link to={props.link}>{props.action}</Link>}
      </div>
    );
  } else {
    errorMsgOutput = null;
  }
  return errorMsgOutput;
};

export default ErrorMsg;
