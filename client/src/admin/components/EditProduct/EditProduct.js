import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductForm from "../CreateProduct/ProductForm/ProductForm";
import Spinner from "../../../share/UI/Spinner/Spinner";
import { useHttp } from "../../../customHooks/useHttp";

const EditProduct = (props) => {
  const [editProductVal, loading, error, fetchData] = useHttp();
  const productId = useParams().productId;
  useEffect(() => {
    fetchData(`http://localhost:5000/products/${productId}`);
  }, []);

  const changeEditValHandler = (val, label) => {
    console.log(val);
    console.log(label);
  };

  console.log(editProductVal);

  return editProductVal ? (
    <>
      <Spinner show={loading} />
      <h1>Edit your product</h1>
      <ProductForm
        brand={editProductVal.brand}
        price={editProductVal.price}
        image={editProductVal.image}
        description={editProductVal.description}
        gender={editProductVal.features.gender}
        inStock={editProductVal.features.inStock}
        cashOnDelivery={editProductVal.features.cashOnDelivery}
        warranty={editProductVal.features.warranty}
        size={editProductVal.features.size}
        return={editProductVal.features.return}
        changeLoginVal={(val, label) => changeEditValHandler(val, label)}
      />
    </>
  ) : null;
};

export default EditProduct;
