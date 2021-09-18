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
}) => {
  const [inputError, setInputError] = useState(false);
  const [outFocused, setOutFocused] = useState(false);

  const changeInputValHandler = (e) => {
    if (validRules.required) {
      if (e.target.value === "") {
        setInputError("This field is required");
      } else {
        setInputError(null);
      }
    }
    changeVal && changeVal(e);
  };
  console.log(inputError);
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
      />
      {inputError && outFocused && <p className="error-msg">{inputError}</p>}
    </div>
  );
};

export default FormInput;
