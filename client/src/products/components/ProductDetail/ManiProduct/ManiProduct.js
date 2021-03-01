import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import "./ManiProduct.css";

import DeleteWarning from "../../../../cart/components/Cart/RemoveItemFromCart/DeleteWarning/DeleteWarning";
import { useHttp } from "../../../../customHooks/useHttp";
import Spinner from "../../../../share/UI/Spinner/Spinner";
import Context from "../../../../contexts/context";

const ManiProduct = (props) => {
  const context = useContext(Context);

  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [deletedItem, loading, error, fetchData] = useHttp();

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

  const deleteProductHandler = () => {
    fetchData(
      `${process.env.REACT_APP_BACKEND_URL}/products/${props.productId}`,
      "delete",
      "",
      context.token
    );
    setShowDeleteWarning(false);
    setTimeout(() => {
      history.push("/");
    }, 500);
  };

  return (
    <>
      <Spinner show={loading} />
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
