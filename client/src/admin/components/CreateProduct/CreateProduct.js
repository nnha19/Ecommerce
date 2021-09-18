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

  const changeImgValHandler = (e) => {
    setProductVal({ ...productVal, image: e.target.files });
  };
  const creatingProductHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("brand", productVal.brand.value);
    formData.append("price", productVal.price.value);
    Array.from(productVal.image).forEach((image) =>
      formData.append("images", image)
    );
    formData.append("description", productVal.description.value);
    // const features = {
    //   gender: productVal.gender.value,
    //   inStock: productVal.inStock.value,
    //   cashOnDelivery: productVal.cashOnDelivery.value,
    //   warranty: productVal.warranty.value,
    //   size: productVal.size.value,
    //   return: productVal.return.value,
    // };
    // const data = {
    //   brand: productVal.brand.value,
    //   price: productVal.price.value,
    //   image: productVal.image,
    //   description: productVal.description.value,
    //   features,
    // };
    props.createProduct(formData);
  };

  return (
    <>
      <div className="checkout-container">
        <ProductForm
          changeImgVal={changeImgValHandler}
          creatingProduct={(e) => creatingProductHandler(e)}
          allValid={allValid}
          changeLoginVal={(val, label) => changeLoginValHandler(val, label)}
        />
      </div>
    </>
  );
};

export default CreateProduct;
