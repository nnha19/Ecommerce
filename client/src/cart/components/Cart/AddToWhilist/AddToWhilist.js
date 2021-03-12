import React, { useState } from "react";

import useHttp from "../../../../customHooks/useHttp";

import "./AddToWhilist.css";

const AddToWhilist = (props) => {
  const [
    createdWhilist,
    loading,
    error,
    fetchData,
    setCreatedWhilist,
    setError,
  ] = useState();

  const addToWhilistHandler = () => {
    console.log("Adding to whilist");
  };

  return (
    <i
      onClick={addToWhilistHandler}
      title="Add to whilist"
      className="far fa-heart cart__item-heart cart__item-icons"
    ></i>
  );
};

export default AddToWhilist;
