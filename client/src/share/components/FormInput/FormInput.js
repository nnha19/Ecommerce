import React, { useState, useReducer, useEffect } from "react";

import "./FormInput.css";

const checkValidity = (val, valType) => {
  if (!valType) {
    return true;
  } else if (valType.type === "REQUIRE") {
    return val.length > 0;
  } else if (valType.type === "MIN_LENGTH") {
    return val.length >= valType.amount;
  }
};

const inputReducer = (state, action) => {
  switch (action.type) {
    case "change":
      return {
        ...state,
        value: action.value,
        valid: action.checkValidity(),
        isTouched: true,
      };
  }
};

const FormInput = (props) => {
  const [inputVal, dispatch] = useReducer(inputReducer, {
    value: props.value ? props.value : "",
    valid: props.id === "message" && true,
    isTouched: false,
  });

  useEffect(() => {
    props.changeLoginVal(inputVal, props.id);
  }, [inputVal.value]);

  const inputChangeHandler = (e) => {
    const value = e.target.value;
    dispatch({
      type: "change",
      value,
      checkValidity: () => checkValidity(value, props.validRules),
    });
  };

  if (props.cleanInput) {
    inputVal.value = "";
  }

  let output;
  if (props.elementType === "input") {
    output = (
      <div className={`form__input-container ${props.containerCls}`}>
        {props.label && (
          <label className={`form__label ${props.labelCls}`}>
            {props.label}
          </label>
        )}
        <input
          disabled={props.disabled}
          placeholder={props.placeholder}
          value={inputVal.value}
          onChange={inputChangeHandler}
          className={`form__input ${props.inputCls}`}
          type={props.type}
        />
        {!inputVal.valid && inputVal.isTouched && (
          <p className="form__err-msg">{props.errorMsg}</p>
        )}
      </div>
    );
  } else if (props.elementType === "textarea") {
    output = (
      <div className={`form__input-container ${props.containerCls}`}>
        {props.label && (
          <label className={`form__label ${props.labelCls}`}>
            {props.label}
          </label>
        )}
        <textarea
          disabled={props.disabled}
          value={inputVal.value}
          onChange={inputChangeHandler}
          className={`form__input ${props.inputCls}`}
          rows={props.rows || "4"}
          cols={props.cols || "50"}
        ></textarea>
        {!inputVal.valid && inputVal.isTouched && (
          <p className="form__err-msg">{props.errorMsg}</p>
        )}
      </div>
    );
  }
  return output ? output : null;
};

export default FormInput;
