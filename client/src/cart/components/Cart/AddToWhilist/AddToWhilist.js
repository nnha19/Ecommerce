import React, { useState } from "react";

import { useHttp } from "../../../../customHooks/useHttp";

import "./AddToWhilist.css";

const AddToWhilist = (props) => {
  const [
    createdWhilist,
    loading,
    error,
    fetchData,
    setCreatedWhilist,
    setError,
  ] = useHttp();

  console.log(props.userId);
  console.log(props.productId);

  const addToWhilistHandler = () => {
    fetchData(
      `http://localhost:5000/whilist/${props.userId}/${props.productId}`,
      "post"
    );
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
