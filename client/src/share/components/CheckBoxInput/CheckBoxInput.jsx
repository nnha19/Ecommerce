import React from "react";

import "./CheckBoxInput.css";

const CheckBoxInput = ({ value, changeVal }) => {
  return (
    <label htmlFor={value} className="checkbox-container">
      {value}
      <input value={value} onChange={changeVal} id={value} type="checkbox" />
      <span className="checkmark"></span>
    </label>
  );
};

export default CheckBoxInput;
