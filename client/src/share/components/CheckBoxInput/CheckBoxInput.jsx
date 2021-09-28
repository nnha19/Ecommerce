import React from "react";

import "./CheckBoxInput.css";

const CheckBoxInput = ({ value, changeVal, label, checked }) => {
  return (
    <label htmlFor={value} className="checkbox-container">
      {label}
      <input
        value={value}
        checked={checked}
        onChange={changeVal}
        id={value}
        type="checkbox"
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default CheckBoxInput;
