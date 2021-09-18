import React, { useState } from "react";

import "./FormInput.css";

const FormInput = ({
  label,
  type,
  placeholder,
  value,
  changeVal,
  inputClsName,
  validRules,
  name,
}) => {
  const [inputError, setInputError] = useState(false);
  const [outFocused, setOutFocused] = useState(false);

  const changeInputValHandler = (e) => {
    let error;
    if (validRules.required) {
      if (e.target.value === "") {
        error = true;
        setInputError("This field is required");
      } else {
        setInputError(null);
        error = false;
      }
    }
    changeVal && changeVal(e, error);
  };
  return (
    <div className="input-container">
      <label className="input__label">{label}</label>
      <input
        className={`input__field ${inputClsName}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={changeInputValHandler}
        onBlur={() => setOutFocused(true)}
        name={name}
      />
      {inputError && outFocused && <p className="error-msg">{inputError}</p>}
    </div>
  );
};

export default FormInput;
