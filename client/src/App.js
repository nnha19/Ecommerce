import React, { useEffect, useState, useRef } from "react";

import "./App.css";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import axios from "axios";

import AllProductsPage from "./products/pages/AllProductsPage/AllProductsPage";
import ProductDetailPage from "./products/pages/ProductDetailPage/ProductDetailPage";
import Navigation from "./share/UI/Navigation/Navigation";
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
import WhilistProductPage from "./WhilistProduct/page/WhilistProductPage";
import AllCouponsPage from "./admin/pages/AllCouponsPage";
import CreateCouponPage from "./admin/pages/CreateCouponPage";
import EditCouponPage from "./admin/pages/EditCouponPage";
import DemoLogin from "./DemoLogin/DemoLogin";
import Footer from "./share/UI/Footer/Footer";
import HomePage from "./home/pages/homePage";

const App = () => {
  const history = useHistory();
  const [cartItem, loading, error, fetchData, setCartItem, setError] =
    useHttp();

  const [cartItemAmount, setCartItemAmount] = useState();
  const [login, setLogin] = useState(false);
  const [curUser, setCurUser] = useState();
  const [token, setToken] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const [totalAmount, setTotalAmount] = useState();
  const [showDropDown, setShowDropDown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [whilist, setWhilist] = useState([]);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const topRef = useRef();

  useEffect(() => {
    curUser &&
      (async () => {
        const result = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/whilist/${curUser.userId}`
        );
        setWhilist(result.data);
      })();
  }, [curUser]);

  useEffect(() => {
    !curUser && setWhilist();
  }, [curUser]);

  const removeOneWhilist = (productId) => {
    const updatedWhilist = whilist.filter(
      (whilist) => whilist._id !== productId
    );
    setWhilist(updatedWhilist);
  };

  const removeAllWhilistHandler = () => {
    setWhilist([]);
  };

  const updateCartItemAmount = () => {
    let totalAmount = 0;
    cartItem &&
      Array.isArray(cartItem) &&
      cartItem.forEach((cartItem) => {
        totalAmount += parseInt(cartItem.cartItem.price) * cartItem.pickedQty;
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
    updateCartItemAmount();
  }, [curUser, cartItem]);

  const loginUserHandler = (customer, token, tokenDate) => {
    const tokenExpirationDate =
      tokenDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setCurUser(customer);
    setToken(token);
    setTokenExpirationDate(tokenExpirationDate);
    setAuthenticated(!!token);
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("customer", JSON.stringify(customer));
    localStorage.setItem(
      "tokenExpirationDate",
      tokenExpirationDate.toISOString()
    );
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

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const customer = JSON.parse(localStorage.getItem("customer"));
    const tokenExpirationDate = new Date(
      localStorage.getItem("tokenExpirationDate")
    );
    if (token && customer && tokenExpirationDate > new Date().getTime()) {
      loginUserHandler(customer, token, tokenExpirationDate);
    }
  }, []);

  useEffect(() => {
    if (token) {
      var timer = setTimeout(
        logoutUserHandler,
        tokenExpirationDate.getTime() - new Date().getTime()
      );
    } else {
      clearTimeout(timer);
    }
  }, [token, tokenExpirationDate]);

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
    <div ref={topRef} onClick={hideDropDownHandler} className="wrapper">
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
        {!authenticated && (
          <DemoLogin
            loginUser={(customer, token) => loginUserHandler(customer, token)}
          />
        )}
        {curUser && curUser.admin && <AdminNavBar curUser={curUser} />}
      </Context.Provider>

      <Switch>
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
            removeOneWhilist: (productId) => removeOneWhilist(productId),
            removeAllWhilist: () => removeAllWhilistHandler(),
            topRef,
          }}
        >
          <Route path="/products" component={AllProductsPage} />

          {authenticated && <Route path="/cart" exact component={CartPage} />}
          <Route exact path="/" component={HomePage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/product/:id" component={ProductDetailPage} />
          <Route exact path="/order/:uid" component={CustomerOrder} />
          <Route exact path="/admin/order/:uid" component={AllOrdersPage} />
          <Route exact path="/whilist/:uid" component={WhilistProductPage} />
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
          {curUser && curUser.admin && (
            <Route exact path="/admin/coupon" component={AllCouponsPage} />
          )}
          {curUser && curUser.admin && (
            <Route
              exact
              path="/admin/coupon/create"
              component={CreateCouponPage}
            />
          )}
          {curUser && curUser.admin && (
            <Route
              exact
              path="/admin/coupon/edit/:couponId"
              component={EditCouponPage}
            />
          )}
        </Context.Provider>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
