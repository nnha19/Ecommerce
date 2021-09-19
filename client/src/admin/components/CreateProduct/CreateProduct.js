import React, { useState } from "react";

import "./CreateProduct.css";
import { serialize } from "object-to-formdata";

import useCheckOverAllValid from "../../../customHooks/useCheckOverAllValid";
import ProductForm from "./ProductForm/ProductForm";

const CreateProduct = (props) => {
  const [productVal, setProductVal] = useState({
    brand: { value: "", error: true },
    price: { value: "", error: true },
    image: { value: "", error: true },
    description: { value: "", error: true },
    gender: { value: "", error: true },
    inStock: { value: "", error: true },
    cashOnDelivery: { value: "", error: true },
    warranty: { value: "", error: true },
    size: { value: "", error: true },
    return: { value: "", error: true },
    uv: { value: "", error: true },
  });

  const [allValid] = useCheckOverAllValid(productVal);

  const creatingProductHandler = (e) => {
    e.preventDefault();

    const features = {
      gender: productVal.gender.value,
      inStock: productVal.inStock.value,
      cashOnDelivery: productVal.cashOnDelivery.value,
      warranty: productVal.warranty.value,
      size: productVal.size.value,
      return: productVal.return.value,
      uv: productVal.uv.value,
    };
    const data = {
      brand: productVal.brand.value,
      price: productVal.price.value,
      description: productVal.description.value,
      features,
    };
    const formData = new FormData();
    formData.append("productDetail", JSON.stringify(data));
    Array.from(productVal.image.value).forEach((img) =>
      formData.append("images", img)
    );
    props.createProduct(formData);
  };

  const changeValHandler = (e, error) => {
    const { name, value } = e.target;
    const updated = { ...productVal[name], value, error };
    setProductVal({ ...productVal, [name]: updated });
  };
  const changeImgValHandler = (e, error) => {
    const updated = {
      ...productVal.image,
      value: e.target.files,
      error,
    };
    setProductVal({ ...productVal, image: updated });
  };

  return (
    <>
      <div className="checkout-container">
        <ProductForm
          changeImgVal={changeImgValHandler}
          creatingProduct={(e) => creatingProductHandler(e)}
          allValid={allValid}
          changeVal={changeValHandler}
          productVals={productVal}
        />
      </div>
      7/
    </>
  );
};

export default CreateProduct;
