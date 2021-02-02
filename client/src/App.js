import React from "react";

import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";

import AllProducts from "./products/pages/AllProductsPage/AllProductsPage";
import ProductDetailPage from "./products/pages/ProductDetailPage/ProductDetailPage";
import Navigation from "./share/UI/Navigation/Navigation";
import FilterProductPage from "./products/pages/FilterProductPage/FilterProductPage";

const App = () => {
  return (
    <div className="wrapper">
      <Navigation />
      <Switch>
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/" component={AllProducts} />
        <Route exact path="/product/:id" component={ProductDetailPage} />
        <Route
          exact
          path="/product/filter/:gender"
          component={FilterProductPage}
        />
      </Switch>
    </div>
  );
};

export default App;
