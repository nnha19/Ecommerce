import React from "react";

import "./DesktopProductContent.css";

import ProductDetailBody from "../ProductDetail/ProductDetailBody/ProductDetailBody";
import ProductFeatures from "../ProductDetail/ProductFeatures/ProductFeatures";

const DesktopProductContent = ({ product }) => {
  return (
    <div className="detail-feature">
      <ProductDetailBody product={product} />
      <ProductFeatures product={product} />
    </div>
  );
};
export default DesktopProductContent;
