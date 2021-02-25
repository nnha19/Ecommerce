import React from "react";

import Modal from "../../../../../share/UI/Modal/Modal";
import Button from "../../../../../share/components/button/button";

const DeleteWarning = (props) => {
  console.log(props.showDeleteWarning);

  return (
    <Modal
      modalShow={props.showDeleteWarning}
      title="Are you sure you want to remove this item?"
      body={
        <>
          <Button clicked={props.cartItemRemove} className="cart__item-remove">
            Sure
          </Button>
          <Button
            clicked={props.deleteWarningCancel}
            className="cart__item-cancel"
          >
            Cancel
          </Button>
        </>
      }
    />
  );
};

export default DeleteWarning;
