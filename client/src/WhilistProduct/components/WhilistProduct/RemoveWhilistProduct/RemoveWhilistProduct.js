import React, { useContext } from "react";

import axios from "axios";

import Context from "../../../../contexts/context";

const RemoveWhilistProduct = (props) => {
  const context = useContext(Context);

  const removeWhilistProductHandler = async () => {
    await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/whilist/${context.curUser.userId}/${props.productId}`
    );
    context.removeOneWhilist(props.productId);
  };

  return (
    <i
      onClick={removeWhilistProductHandler}
      className="fas fa-trash cart__item-delete cart__item-icons"
    ></i>
  );
};

export default RemoveWhilistProduct;
