import React, { useState } from "react";

const ImageUpload = ({ changeImgVal, validRules }) => {
  const [error, setError] = useState(null);
  const changeImgHandler = (e) => {
    let error;
    if (validRules.required) {
      if (!e.target.files[0]) {
        error = "Images are required";
      } else {
        error = null;
      }
      setError(error);
      changeImgVal(e, error);
    }
  };
  return (
    <div>
      <input onChange={changeImgHandler} type="file" multiple="multiple" />
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};
export default ImageUpload;
