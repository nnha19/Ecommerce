import React from "react";

import "./CheckBoxInput.css";

const CheckBoxInput = ({ value, changeVal, id, key }) => {
  return (
    <label htmlFor={id} className="checkbox-container">
      {value}
      <input value={value} onChange={changeVal} id={id} type="checkbox" />
      <span className="checkmark"></span>
    </label>
  );
};

export default CheckBoxInput;
