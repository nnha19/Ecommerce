import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Spinner from "../../../share/UI/Spinner/Spinner";
import { useHttp } from "../../../customHooks/useHttp";
import Context from "../../../contexts/context";
import CreateProduct from "../CreateProduct/CreateProduct";

const EditProduct = (props) => {
  const { token } = useContext(Context);
  const [editProductVal, loading, error, fetchData] = useHttp();
  const [editedProduct, editIsLoading, editError, editData] = useHttp();

  const { productId } = useParams();

  useEffect(() => {
    fetchData(`${process.env.REACT_APP_BACKEND_URL}/products/${productId}`);
  }, []);

  const history = useHistory();

  const editProductHandler = (value) => {
    console.log(value);
    editData(
      `${process.env.REACT_APP_BACKEND_URL}/products/${editProductVal._id}`,
      "put",
      value,
      token
    );
    history.push("/");
  };

  return editProductVal ? (
    <>
      <Spinner show={loading || editIsLoading} />
      <CreateProduct
        editProductVal={editProductVal}
        createProduct={editProductHandler}
      />
    </>
  ) : null;
};

export default EditProduct;
