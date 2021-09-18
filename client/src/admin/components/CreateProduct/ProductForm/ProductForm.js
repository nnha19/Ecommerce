import React from "react";

import FormInput from "../../../../share/components/FormInput/FormInput";
import ImageUpload from "../../../../share/components/ImageUpload/ImageUpload";
import SecondaryBtn from "../../../../share/components/SecondaryBtn/SecondaryBtn";

import "./ProductForm.css";

const ProductForm = (props) => {
  return (
    <form onSubmit={props.creatingProduct} className="admin-form">
      <div className="admin-form__inputs">
        <div className="admin-form__product">
          <FormInput
            value={props.brand}
            inputCls="checkout__input"
            errorMsg="This field is required"
            elementType="input"
            type="text"
            placeholder="Brand"
            id="brand"
            validRules={{ type: "REQUIRE" }}
            changeLoginVal={(type, label) => props.changeLoginVal(type, label)}
          />
          <FormInput
            value={props.price}
            inputCls="checkout__input"
            errorMsg="This field is required"
            elementType="input"
            type="number"
            placeholder="Price"
            id="price"
            validRules={{ type: "REQUIRE" }}
            changeLoginVal={(type, label) => props.changeLoginVal(type, label)}
          />
          <ImageUpload changeImgVal={props.changeImgVal} />
          <FormInput
            value={props.description}
            inputCls="checkout__input"
            errorMsg="This field is required"
            elementType="textarea"
            type="text"
            placeholder="Description"
            id="description"
            validRules={{ type: "REQUIRE" }}
            changeLoginVal={(type, label) => props.changeLoginVal(type, label)}
          />
        </div>
        <div className="admin-form__features">
          <FormInput
            value={props.gender}
            inputCls="checkout__input"
            errorMsg="This field is required"
            elementType="input"
            type="text"
            placeholder="Gender"
            id="gender"
            validRules={{ type: "REQUIRE" }}
            changeLoginVal={(type, label) => props.changeLoginVal(type, label)}
          />
          <FormInput
            value={props.inStock}
            inputCls="checkout__input"
            errorMsg="This field is required"
            elementType="input"
            type="number"
            placeholder="In Stock"
            id="inStock"
            validRules={{ type: "REQUIRE" }}
            changeLoginVal={(type, label) => props.changeLoginVal(type, label)}
          />
          <FormInput
            value={props.cashOnDelivery}
            inputCls="checkout__input"
            errorMsg="This field is required"
            elementType="input"
            type="text"
            placeholder="Cash On Delivery"
            id="cashOnDelivery"
            validRules={{ type: "REQUIRE" }}
            changeLoginVal={(type, label) => props.changeLoginVal(type, label)}
          />
          <FormInput
            value={props.warranty}
            inputCls="checkout__input"
            errorMsg="This field is required"
            elementType="input"
            type="text"
            placeholder="Warranty"
            id="warranty"
            validRules={{ type: "REQUIRE" }}
            changeLoginVal={(type, label) => props.changeLoginVal(type, label)}
          />
          <FormInput
            value={props.size}
            inputCls="checkout__input"
            errorMsg="This field is required"
            elementType="input"
            type="number"
            placeholder="Size"
            id="size"
            validRules={{ type: "REQUIRE" }}
            changeLoginVal={(type, label) => props.changeLoginVal(type, label)}
          />
          <FormInput
            value={props.return}
            inputCls="checkout__input"
            errorMsg="This field is required"
            elementType="input"
            type="text"
            placeholder="Return Policy"
            id="return"
            validRules={{ type: "REQUIRE" }}
            changeLoginVal={(type, label) => props.changeLoginVal(type, label)}
          />
        </div>
      </div>
      <div className="admin-form__btn-container">
        <SecondaryBtn disabled={!props.allValid} className="admin-form__btn">
          Submit
        </SecondaryBtn>
      </div>
    </form>
  );
};

export default ProductForm;
