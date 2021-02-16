import React, { useState, useReducer } from "react";

import "./FormInput.css";

const checkValidity = (val, valType) => {
  if (valType.type === "REQUIRE") {
    return val.length > 0;
  } else if (valType.type === "MIN_Length") {
    return val.length >= valType.amount;
  }
};

const inputReducer = (state, action) => {
  switch (action.type) {
    case "change":
      return {
        value: action.value,
        valid: (val) => checkValidity(val),
      };
  }
};

const FormInput = (props) => {
  const [value, setValue] = useState("");
  const [inputVal, dispatch] = useReducer(inputReducer, "");

  const inputChangeHandler = (e) => {
    const value = e.target.value;
    dispatch({ type: "change", value });
  };

  let output;
  if (props.elementType === "input") {
    output = (
      <div className="form__input-container">
        <label className={`form__label ${props.labelCls}`}>{props.label}</label>
        <input
          value={value}
          onChange={inputChangeHandler}
          className={`form__input ${props.inputCls}`}
          type={props.type}
        />
      </div>
    );
  } else if (props.elementType === "textarea") {
    <div className="form__input-container">
      <label className={`form__label ${props.labelCls}`}>{props.label}</label>
      <textarea
        value={value}
        onChange={inputChangeHandler}
        className={`form__input ${props.inputCls}`}
      />
    </div>;
  }
  return output ? output : null;
};

export default FormInput;
