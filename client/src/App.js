import React, { useEffect, useState, Suspense } from "react";

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
import { useHttp } from "./customHooks/useHttp";
import CustomerOrder from "./Customer/pages/CustomerOrderPage";
import AdminNavBar from "./admin/components/NavBar/NavBar";
import AllOrdersPage from "./admin/pages/AllOrdersPage";
import CreateProductPage from "./admin/pages/CreateProductPage";
import EditProductPage from "./admin/pages/EditProductPage";

const App = () => {
  const history = useHistory();
  const [
    cartItem,
    loading,
    error,
    fetchData,
    setCartItem,
    setError,
  ] = useHttp();

  const [cartItemAmount, setCartItemAmount] = useState();
  const [login, setLogin] = useState(false);
  const [curUser, setCurUser] = useState();
  const [token, setToken] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const [totalAmount, setTotalAmount] = useState();
  const [showDropDown, setShowDropDown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [whilist, setWhilist] = useState([]);

  useEffect(() => {
    curUser &&
      (async () => {
        const result = await axios.get(
          `http://localhost:5000/whilist/${curUser.userId}`
        );
        setWhilist(result.data);
      })();
  }, [curUser]);

  console.log(whilist);

  const updateCartItemAmount = () => {
    let totalAmount = 0;
    cartItem &&
      Array.isArray(cartItem) &&
      cartItem.forEach((cartItem) => {
        totalAmount += parseInt(cartItem.price) * cartItem.pickedQty;
      });

    const result =
      cartItem &&
      Array.isArray(cartItem) &&
      cartItem
        .map((d) => {
          return d.pickedQty;
        })
        .reduce((pre, cur) => {
          return pre + cur;
        }, 0);
    setCartItemAmount(result);
    setTotalAmount(totalAmount);
  };

  useEffect(() => {
    if (curUser) {
      updateCartItemAmount();
      fetchData(
        `${process.env.REACT_APP_BACKEND_URL}/cart/${curUser.userId}`,
        "get"
      );
    } else {
      setCartItem([]);
    }
  }, [curUser]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const customer = JSON.parse(localStorage.getItem("customer"));
    if (token && customer) {
      setToken(token);
      setCurUser(customer);
      setAuthenticated(!!token);
    }
  }, []);

  useEffect(() => {
    updateCartItemAmount();
  }, [curUser, cartItem]);

  const loginUserHandler = (customer, token) => {
    setCurUser(customer);
    setToken(token);
    setAuthenticated(!!token);
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("customer", JSON.stringify(customer));
  };

  const logoutUserHandler = () => {
    setCurUser(false);
    setToken("");
    setAuthenticated(false);
    history.push("/");
    localStorage.clear();
    setToken("");
    setCurUser("");
    setAuthenticated(false);
  };

  const toggleLoginHandler = () => {
    setLogin(!login);
  };

  const hideDropDownHandler = (e) => {
    if (!e.target.closest(".customer")) {
      setShowDropDown(false);
    }
    if (showSearch && !e.target.closest(".nav__search")) {
      setShowSearch(false);
    }
  };

  return (
    <div onClick={hideDropDownHandler} className="wrapper">
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
          showDropDown,
          setShowDropDown: (boolean) => setShowDropDown(boolean),
          showSearch,
          showSearchHandler: () => setShowSearch(true),
        }}
      >
        <Navigation />
        {curUser && curUser.admin && <AdminNavBar curUser={curUser} />}
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
            token,
            updateCartItemAmount: () => updateCartItemAmount(),
            curUser,
            authenticated,
            toggleLogin: toggleLoginHandler,
            totalAmount,
            cartItemAmount,
            cartItemData: {
              cartItem,
              loading,
              error,
              setCartItem: (cartItem) => setCartItem(cartItem),
              fetchData: (url, method, data) => fetchData(url, method, data),
              setError: (boolean) => setError(boolean),
            },
            setWhilist: (whilist) => setWhilist(whilist),
            whilist,
          }}
        >
          {authenticated && <Route path="/cart" exact component={CartPage} />}
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/product/:id" component={ProductDetailPage} />
          <Route exact path="/order/:uid" component={CustomerOrder} />
          <Route exact path="/admin/order/:uid" component={AllOrdersPage} />
          {curUser && curUser.admin && (
            <Route
              exact
              path="/admin/product/create"
              component={CreateProductPage}
            />
          )}
          {curUser && curUser.admin && (
            <Route
              exact
              path="/admin/product/edit/:productId"
              component={EditProductPage}
            />
          )}
        </Context.Provider>
      </Switch>
    </div>
  );
};

export default App;
