import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import ProductForm from "../CreateProduct/ProductForm/ProductForm";
import Spinner from "../../../share/UI/Spinner/Spinner";
import { useHttp } from "../../../customHooks/useHttp";
import useCheckOverAllValid from "../../../customHooks/useCheckOverAllValid";
import Context from "../../../contexts/context";

const EditProduct = (props) => {
  const context = useContext(Context);
  const history = useHistory();

  const [editProductVal, loading, error, fetchData] = useHttp();
  const [editedProduct, editIsLoading, editError, editData] = useHttp();

  const productId = useParams().productId;

  useEffect(() => {
    fetchData(`${process.env.REACT_APP_BACKEND_URL}/products/${productId}`);
  }, []);

  const [productVal, setProductVal] = useState({
    brand: "",
    price: "",
    image: "",
    description: "",
    gender: "",
    inStock: "",
    cashOnDelivery: "",
    warranty: "",
    size: "",
    return: "",
  });

  const [allValid] = useCheckOverAllValid(productVal);

  useEffect(() => {
    editProductVal &&
      setProductVal({
        ...productVal,
        brand: {
          value: editProductVal.brand,
          isTouched: true,
          valid: true,
        },
        price: { value: editProductVal.price, valid: true, isTouched: true },
        image: { value: editProductVal.image, valid: true, isTouched: true },
        description: {
          value: editProductVal.description,
          valid: true,
          isTouched: true,
        },
        gender: {
          value: editProductVal.features.gender,
          valid: true,
          isTouched: true,
        },
        inStock: {
          value: editProductVal.features.inStock,
          valid: true,
          isTouched: true,
        },
        cashOnDelivery: {
          value: editProductVal.cashOnDelivery,
          valid: true,
          isTouched: true,
        },
        warranty: {
          value: editProductVal.features.warranty,
          valid: true,
          isTouched: true,
        },
        size: {
          value: editProductVal.features.size,
          valid: true,
          isTouched: true,
        },
        return: {
          value: editProductVal.features.return,
          valid: true,
          isTouched: true,
        },
      });
  }, [editProductVal]);

  const changeEditValHandler = (val, label) => {
    setProductVal({ ...productVal, [label]: val });
  };

  const editProductHandler = (e) => {
    e.preventDefault();
    const features = {
      gender: productVal.gender.value,
      inStock: productVal.inStock.value,
      cashOnDelivery: productVal.cashOnDelivery.value,
      warranty: productVal.warranty.value,
      size: productVal.size.value,
      brand: productVal.brand.value,
      return: productVal.return.value,
    };
    const data = {
      brand: productVal.brand.value,
      price: productVal.price.value,
      image: productVal.image.value,
      description: productVal.description.value,
      features,
    };
    editData(
      `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`,
      "put",
      data,
      context.token
    );
    setTimeout(() => {
      history.push(`/product/${productId}`);
    }, 500);
  };

  return editProductVal ? (
    <>
      <Spinner show={loading || editIsLoading} />
      <h1>Edit your product</h1>
      <ProductForm
        creatingProduct={editProductHandler}
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
        allValid={allValid}
      />
    </>
  ) : null;
};

export default EditProduct;
