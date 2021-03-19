import React, { useContext, useEffect } from "react";

import { useHttp } from "../../../../customHooks/useHttp";
import Context from "../../../../contexts/context";

import "./AddToWhilist.css";

const AddToWhilist = (props) => {
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
    if (!context.authenticated) {
      context.toggleLogin();
      return;
    }
    fetchData(
      `${process.env.REACT_APP_BACKEND_URL}/whilist/${props.userId}/${props.productId}`,
      "post"
    );
  };

  return !loading ? (
    <i
      onClick={addToWhilistHandler}
      title="Add to whilist"
      className={`fa${
        props.addedToWhilist ? "s" : "r"
      } fa-heart cart__item-heart cart__item-icons`}
    ></i>
  ) : (
    <span className="add-to-whilist-loading"></span>
  );
};

export default AddToWhilist;
