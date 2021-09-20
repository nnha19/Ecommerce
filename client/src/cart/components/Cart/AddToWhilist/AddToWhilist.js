import React, { useContext, useEffect, useState } from "react";

import { useHttp } from "../../../../customHooks/useHttp";
import Context from "../../../../contexts/context";

import "./AddToWhilist.css";

const AddToWhilist = ({ product, className }) => {
  const [addedToWhilist, setAddedToWhilist] = useState(false);

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
    if (product && context.whilist) {
      const addedToWhilist = context.whilist.some(
        (whilist) => whilist._id === product._id
      );
      setAddedToWhilist(addedToWhilist);
    }
  }, [product, context.whilist]);

  useEffect(() => {
    createdWhilist && context.setWhilist(createdWhilist);
  }, [createdWhilist]);

  const addToWhilistHandler = () => {
    if (!context.authenticated) {
      context.toggleLogin();
      return;
    }
    fetchData(
      `${process.env.REACT_APP_BACKEND_URL}/whilist/${context.curUser.userId}/${product._id}`,
      "post"
    );
  };
  return (
    <div className="add-to-whilist-container">
      {!loading ? (
        <i
          onClick={addToWhilistHandler}
          title="Add to whilist"
          className={`fa${
            addedToWhilist ? "s" : "r"
          } fa-heart cart__item-heart cart__item-icons ${className}`}
        ></i>
      ) : (
        <span className="add-to-whilist-loading"></span>
      )}
    </div>
  );
};

export default AddToWhilist;
