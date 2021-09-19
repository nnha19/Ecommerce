import React from "react";

import FormInput from "../../../../share/components/FormInput/FormInput";
import ImageUpload from "../../../../share/components/ImageUpload/ImageUpload";
import SecondaryBtn from "../../../../share/components/SecondaryBtn/SecondaryBtn";

import "./ProductForm.css";

const ProductForm = ({
  productVals,
  changeVal,
  creatingProduct,
  changeImgVal,
  allValid,
}) => {
  return (
    <div className="admin-form-container">
      <h2 className="admin-form__header">Create Product</h2>
      <form onSubmit={creatingProduct} className="admin-form">
        <div className="admin-form__inputs">
          <FormInput
            name="brand"
            type="text"
            label="Brand"
            value={productVals.brand.value}
            changeVal={changeVal}
            validRules={{ required: true }}
          />
          <FormInput
            name="price"
            type="number"
            label="Price"
            value={productVals.price.value}
            validRules={{ required: true }}
            changeVal={changeVal}
          />
          <FormInput
            name="description"
            type="text"
            label="Description"
            value={productVals.description.value}
            validRules={{ required: true }}
            changeVal={changeVal}
          />
          <FormInput
            name="gender"
            type="text"
            label="Gender"
            value={productVals.gender.value}
            validRules={{ required: true }}
            changeVal={changeVal}
          />
          <FormInput
            name="inStock"
            type="number"
            label="In Stock"
            value={productVals.inStock.value}
            validRules={{ required: true }}
            changeVal={changeVal}
          />
          <FormInput
            name="cashOnDelivery"
            type="text"
            label="Cash On Delivery"
            value={productVals.cashOnDelivery.value}
            validRules={{ required: true }}
            changeVal={changeVal}
          />
          <FormInput
            name="warranty"
            type="text"
            label="Warranty"
            value={productVals.warranty.value}
            validRules={{ required: true }}
            changeVal={changeVal}
          />
          <FormInput
            name="size"
            type="number"
            label="Size"
            value={productVals.size.value}
            validRules={{ required: true }}
            changeVal={changeVal}
          />
          <FormInput
            name="return"
            type="text"
            label="Return Policy"
            value={productVals.return.value}
            validRules={{ required: true }}
            changeVal={changeVal}
          />
          <FormInput
            name="uv"
            type="number"
            label="UV"
            value={productVals.uv.value}
            validRules={{ required: true }}
            changeVal={changeVal}
          />
          <ImageUpload
            validRules={{ required: true }}
            changeImgVal={changeImgVal}
          />
        </div>
        <div className="admin-form__btn-container">
          <SecondaryBtn disabled={!allValid} className="admin-form__btn">
            Submit
          </SecondaryBtn>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
