import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import CreateProduct from "../components/CreateProduct/CreateProduct";
import { useHttp } from "../../customHooks/useHttp";
import Spinner from "../../share/UI/Spinner/Spinner";
import Context from "../../contexts/context";

const CreateProductPage = (props) => {
  const context = useContext(Context);
  const history = useHistory();
  const [
    createdProduct,
    loading,
    error,
    fetchData,
    setCreatedProduct,
    setError,
    finished,
  ] = useHttp();

  const createProductHandler = (value) => {
    fetchData(
      `${process.env.REACT_APP_BACKEND_URL}/products`,
      "post",
      value,
      context.token
    );
  };
  useEffect(() => {
    //redirect homepage when finished creating product
    finished && history.push("/");
  }, [finished]);

  return (
    <>
      <Spinner show={loading} />
      <CreateProduct createProduct={(value) => createProductHandler(value)} />
    </>
  );
};

export default CreateProductPage;
