import React, { useState } from "react";

import "./TextArea.css";

const TextArea = ({
  placeholder,
  value,
  changeVal,
  validRules,
  rows,
  cols,
  className,
}) => {
  const [error, setError] = useState(false);

  const changeInputValHandler = (e) => {
    const { value } = e.target;
    let error;
    if (validRules && validRules.required) {
      if (value === "") {
        error = "This field is required";
      }
    }
    changeVal(value, error);
    setError(error);
  };

  return (
    <div className={`text-area ${className}`}>
      <p className="error-msg">{error}</p>
      <textarea
        onChange={changeInputValHandler}
        value={value}
        placeholder={placeholder}
        rows={rows || "7"}
      ></textarea>
    </div>
  );
};

export default TextArea;
