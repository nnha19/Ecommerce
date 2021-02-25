import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import "./ManiProduct.css";

import Context from "../../../../contexts/context";
import DeleteWarning from "../../../../cart/components/Cart/RemoveItemFromCart/DeleteWarning/DeleteWarning";

const ManiProduct = (props) => {
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const history = useHistory();
  const editProductHandler = () => {
    history.push(`/admin/product/edit/${props.productId}`);
  };

  const deleteWarningHandler = () => {
    setShowDeleteWarning(true);
  };

  const cancelDeleteWarningHandler = () => {
    setShowDeleteWarning(false);
  };
  const deleteProductHandler = () => {};

  return (
    <>
      <DeleteWarning
        cartItemRemove={deleteProductHandler}
        deleteWarningCancel={cancelDeleteWarningHandler}
        showDeleteWarning={showDeleteWarning}
      />
      <div
        onClick={props.showDropDownHandler}
        className="mani-product-container"
      >
        <div className="mani-product">
          <span className="mani-product__btn"></span>
        </div>
        <div
          className={`${
            props.showDropDown ? "drop-down show-dropdown" : "drop-down"
          }`}
        >
          <div onClick={editProductHandler} className="drop-down__items edit">
            Edit
          </div>
          <div
            onClick={deleteWarningHandler}
            className="drop-down__items delete"
          >
            Delete
          </div>
        </div>
      </div>
    </>
  );
};

export default ManiProduct;
