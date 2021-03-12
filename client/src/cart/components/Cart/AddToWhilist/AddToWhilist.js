import React, { useContext, useEffect } from "react";

import { useHttp } from "../../../../customHooks/useHttp";
import Context from "../../../../contexts/context";

import "./AddToWhilist.css";

const AddToWhilist = (props) => {
  console.log(props.addedToWhilist);

  const context = useContext(Context);
  const [
    createdWhilist,
    loading,
    error,
    fetchData,
    setCreatedWhilist,
    setError,
  ] = useHttp(null);

  useEffect(() => {
    createdWhilist && context.setWhilist(createdWhilist);
  }, [createdWhilist]);

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
      className={`fa${
        props.addedToWhilist ? "s" : "r"
      } fa-heart cart__item-heart cart__item-icons`}
    ></i>
  );
};

export default AddToWhilist;
