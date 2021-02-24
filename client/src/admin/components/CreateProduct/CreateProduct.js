import React, { useState } from "react";

import "./CreateProduct.css";

import useCheckOverAllValid from "../../../customHooks/useCheckOverAllValid";
import ProductForm from "./ProductForm/ProductForm";

const CreateProduct = (props) => {
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

  const changeLoginValHandler = (val, label) => {
    setProductVal({ ...productVal, [label]: val });
  };

  const creatingProductHandler = (e) => {
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
    props.createProduct(data);
  };

  return (
    <>
      <div className="checkout-container">
        <h1>Create Product</h1>
        <ProductForm
          creatingProduct={() => creatingProductHandler()}
          allValid={allValid}
          changeLoginVal={(val, label) => changeLoginValHandler(val, label)}
        />
      </div>
    </>
  );
};

export default CreateProduct;
