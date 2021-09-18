import React from "react";

const ImageUpload = (props) => {
  return (
    <div>
      <input onChange={props.changeImgVal} type="file" multiple="multiple" />
    </div>
  );
};
export default ImageUpload;
