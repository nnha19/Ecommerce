import React, { useState } from "react";

import "./CreateProduct.css";

import useCheckOverAllValid from "../../../customHooks/useCheckOverAllValid";
import ProductForm from "./ProductForm/ProductForm";

const CreateProduct = ({ createProduct, editProductVal }) => {
  const productValsArr =
    "brand price image description gender inStock cashOnDelivery warranty size return uv".split(
      " "
    );
  const productValObj = {};
  productValsArr.forEach((key) => {
    if (editProductVal) {
      const newObj = { ...editProductVal, ...editProductVal.features };
      productValObj[key] = { value: newObj[key], error: false };
    } else {
      productValObj[key] = { value: "", error: true };
    }
  });
  const [productVal, setProductVal] = useState(productValObj);
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
    if (editProductVal && !productVal.image.value) {
      createProduct(formData);
      return;
    }
    Array.from(productVal.image.value).forEach((img) =>
      formData.append("images", img)
    );
    createProduct(formData);
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
          isEditing={!!editProductVal}
        />
      </div>
      7/
    </>
  );
};

export default CreateProduct;
