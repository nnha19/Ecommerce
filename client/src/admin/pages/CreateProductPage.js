import React, { useContext } from "react";
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
  ] = useHttp();

  const createProductHandler = (value) => {
    fetchData(`http://localhost:5000/products`, "post", value, context.token);
    history.push("/");
  };

  return (
    <>
      <Spinner show={loading} />
      <CreateProduct createProduct={(value) => createProductHandler(value)} />
    </>
  );
};

export default CreateProductPage;
