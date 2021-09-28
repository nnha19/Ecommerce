import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Spinner from "../../../share/UI/Spinner/Spinner";
import { useHttp } from "../../../customHooks/useHttp";
import Context from "../../../contexts/context";
import CreateProduct from "../CreateProduct/CreateProduct";

const EditProduct = (props) => {
  const { token } = useContext(Context);
  const [editProductVal, loading, error, fetchData] = useHttp();
  const [editedProduct, editIsLoading, editError, editData, , , finished] =
    useHttp();

  const { productId } = useParams();

  useEffect(() => {
    fetchData(`${process.env.REACT_APP_BACKEND_URL}/products/${productId}`);
  }, []);

  const history = useHistory();

  const editProductHandler = (value) => {
    editData(
      `${process.env.REACT_APP_BACKEND_URL}/products/${editProductVal._id}`,
      "put",
      value,
      token
    );
  };
  useEffect(() => {
    //redirect when finish editing product
    finished && history.push("/");
  }, [finished]);

  return editProductVal ? (
    <>
      <div style={{ textAlign: "center" }} className="edit-product-warning">
        <p>If you don't provide new images, old images will be used</p>
      </div>
      <Spinner show={loading || editIsLoading} />
      <CreateProduct
        editProductVal={editProductVal}
        createProduct={editProductHandler}
      />
    </>
  ) : null;
};

export default EditProduct;
