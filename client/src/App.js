import React, { useEffect, useState } from "react";

import "./App.css";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import axios from "axios";

import AllProducts from "./products/pages/AllProductsPage/AllProductsPage";
import ProductDetailPage from "./products/pages/ProductDetailPage/ProductDetailPage";
import Navigation from "./share/UI/Navigation/Navigation";
import FilterProductPage from "./products/pages/FilterProductPage/FilterProductPage";
import CartPage from "./cart/pages/CartPage/CartPage";
import Context from "./contexts/context";
import Auth from "./share/components/auth/auth";
import CheckoutPage from "./cart/pages/CheckoutPage/CheckoutPage";

const App = () => {
  const history = useHistory();
  const [cartItemAmount, setCartItemAmount] = useState();
  const [login, setLogin] = useState(false);
  const [curUser, setCurUser] = useState();
  const [token, setToken] = useState();
  const [authenticated, setAuthenticated] = useState(false);

  const updateCartItemAmount = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:5000/cart/${curUser.userId}`
      );
      const data = resp.data;
      const result = data
        .map((d) => {
          return d.pickedQty;
        })
        .reduce((pre, cur) => {
          return pre + cur;
        }, 0);
      console.log(result);
      setCartItemAmount(result);
    } catch (err) {
      console.log(err);
      setCartItemAmount();
    }
  };

  useEffect(() => {
    console.log(curUser);
    updateCartItemAmount();
  }, [curUser]);

  const loginUserHandler = (customer, token) => {
    setCurUser(customer);
    setToken(token);
    setAuthenticated(!!token);
  };

  const logoutUserHandler = () => {
    setCurUser(false);
    setToken("");
    setAuthenticated(false);
    history.push("/");
  };

  const toggleLoginHandler = () => {
    setLogin(!login);
  };

  return (
    <div className="wrapper">
      <Auth
        loginUser={(customer, token) => loginUserHandler(customer, token)}
        toggleLogin={toggleLoginHandler}
        login={login}
      />
      <Context.Provider
        value={{
          logout: logoutUserHandler,
          cartItemAmount,
          toggleLogin: () => toggleLoginHandler(),
          curUser,
          authenticated: !!authenticated,
        }}
      >
        <Navigation />
      </Context.Provider>
      <Switch>
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/" component={AllProducts} />
        <Route
          exact
          path="/product/filter/:gender"
          component={FilterProductPage}
        />
        <Context.Provider
          value={{
            updateCartItemAmount: () => updateCartItemAmount(),
            curUser,
            authenticated,
            toggleLogin: toggleLoginHandler,
          }}
        >
          {authenticated && <Route path="/cart" exact component={CartPage} />}
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/product/:id" component={ProductDetailPage} />
        </Context.Provider>
      </Switch>
    </div>
  );
};

export default App;
