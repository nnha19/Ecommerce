import React from "react";

import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";

import AllProducts from "./products/pages/AllProductsPage/AllProductsPage";
import ProductDetailPage from "./products/pages/ProductDetailPage/ProductDetailPage";

const App = () => {
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/" component={AllProducts} />
        <Route exact path="/product/:id" component={ProductDetailPage} />
      </Switch>
    </div>
  );
};

export default App;
