import React from "react";

import "./Spinner.css";

const Spinner = (props) => {
  console.log(props.show);
  return (
    <div className={`spinner-container ${props.show && "show"}`}>
      <div className="spinner"></div>;
    </div>
  );
};

export default Spinner;
