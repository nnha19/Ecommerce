import React, { useState } from "react";

import "./CreateProduct.css";

import FormInput from "../../../share/components/FormInput/FormInput";
import SecondaryBtn from "../../../share/components/SecondaryBtn/SecondaryBtn";
import useCheckOverAllValid from "../../../customHooks/useCheckOverAllValid";

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
        <form onSubmit={creatingProductHandler} className="admin-form">
          <div className="admin-form__inputs">
            <div className="admin-form__product">
              <FormInput
                inputCls="checkout__input"
                errorMsg="This field is required"
                elementType="input"
                type="text"
                placeholder="Brand"
                id="brand"
                validRules={{ type: "REQUIRE" }}
                changeLoginVal={(type, label) =>
                  changeLoginValHandler(type, label)
                }
              />
              <FormInput
                inputCls="checkout__input"
                errorMsg="This field is required"
                elementType="input"
                type="number"
                placeholder="Price"
                id="price"
                validRules={{ type: "REQUIRE" }}
                changeLoginVal={(type, label) =>
                  changeLoginValHandler(type, label)
                }
              />
              <FormInput
                inputCls="checkout__input"
                errorMsg="This field is required"
                elementType="input"
                type="text"
                placeholder="Image"
                id="image"
                validRules={{ type: "REQUIRE" }}
                changeLoginVal={(type, label) =>
                  changeLoginValHandler(type, label)
                }
              />
              <FormInput
                inputCls="checkout__input"
                errorMsg="This field is required"
                elementType="textarea"
                type="text"
                placeholder="Description"
                id="description"
                validRules={{ type: "REQUIRE" }}
                changeLoginVal={(type, label) =>
                  changeLoginValHandler(type, label)
                }
              />
            </div>
            <div className="admin-form__features">
              <FormInput
                inputCls="checkout__input"
                errorMsg="This field is required"
                elementType="input"
                type="text"
                placeholder="Gender"
                id="gender"
                validRules={{ type: "REQUIRE" }}
                changeLoginVal={(type, label) =>
                  changeLoginValHandler(type, label)
                }
              />
              <FormInput
                inputCls="checkout__input"
                errorMsg="This field is required"
                elementType="input"
                type="number"
                placeholder="In Stock"
                id="inStock"
                validRules={{ type: "REQUIRE" }}
                changeLoginVal={(type, label) =>
                  changeLoginValHandler(type, label)
                }
              />
              <FormInput
                inputCls="checkout__input"
                errorMsg="This field is required"
                elementType="input"
                type="text"
                placeholder="Cash On Delivery"
                id="cashOnDelivery"
                validRules={{ type: "REQUIRE" }}
                changeLoginVal={(type, label) =>
                  changeLoginValHandler(type, label)
                }
              />
              <FormInput
                inputCls="checkout__input"
                errorMsg="This field is required"
                elementType="input"
                type="text"
                placeholder="Warranty"
                id="warranty"
                validRules={{ type: "REQUIRE" }}
                changeLoginVal={(type, label) =>
                  changeLoginValHandler(type, label)
                }
              />
              <FormInput
                inputCls="checkout__input"
                errorMsg="This field is required"
                elementType="input"
                type="number"
                placeholder="Size"
                id="size"
                validRules={{ type: "REQUIRE" }}
                changeLoginVal={(type, label) =>
                  changeLoginValHandler(type, label)
                }
              />
              <FormInput
                inputCls="checkout__input"
                errorMsg="This field is required"
                elementType="input"
                type="text"
                placeholder="Return Policy"
                id="return"
                validRules={{ type: "REQUIRE" }}
                changeLoginVal={(type, label) =>
                  changeLoginValHandler(type, label)
                }
              />
            </div>
          </div>
          <SecondaryBtn disabled={!allValid} className="admin-form__btn">
            Submit
          </SecondaryBtn>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
