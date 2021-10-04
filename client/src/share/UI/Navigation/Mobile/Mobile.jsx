import React, { useContext, useState } from "react";
import { LogoNavItem, NavItemCart, NavItemLink } from "../NavItems/NavItems";
import CustomerAvatar from "../../CustomerAvatar/CustomerAvatar";
import Logout from "../NavItems/Auth/Logout/Logout";
import "./Mobile.css";
import Context from "../../../../contexts/context";
import Login from "../NavItems/Auth/Login";
import BackDrop from "../../BackDrop/BackDrop";

const Mobile = () => {
  const { authenticated } = useContext(Context);
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const hideSideDrawerHandler = (e) => {
    setShowSideDrawer(false);
  };
  return (
    <div className="mobile-nav">
      <LogoNavItem />
      <div className="mobile-nav__right">
        <NavItemCart />
        <div className="hamburger-icon" onClick={() => setShowSideDrawer(true)}>
          <span className="hamburger-icon__child"></span>
        </div>
      </div>
      <>
        <div
          onClick={hideSideDrawerHandler}
          className={`mobile-nav__side-drawer ${
            showSideDrawer && "show-sidedrawer"
          }`}
        >
          <i
            onClick={() => setShowSideDrawer(false)}
            className="fas fa-times close-sidedrawer"
          ></i>
          <NavItemLink className="mobile-nav__link" to="/">
            Home
          </NavItemLink>
          <NavItemLink className="mobile-nav__link" to="/products">
            Shop
          </NavItemLink>
          {authenticated ? (
            <>
              <NavItemLink className="mobile-nav__link" to="/products">
                My Orders
              </NavItemLink>
              <NavItemLink className="mobile-nav__link" to="/products">
                My Whilists
              </NavItemLink>
              <div className="mobile-nav__customer-avatar-container">
                <CustomerAvatar className="mobile-nav__customer-avatar" />
              </div>
              <Logout className="mobile-nav__logout" />
            </>
          ) : (
            <div className="mobile-nav__login-container">
              <Login className="mobile-nav__login" />
            </div>
          )}
        </div>
        <BackDrop
          backDropShow={showSideDrawer}
          clicked={() => setShowSideDrawer(false)}
        />
      </>
    </div>
  );
};

export default Mobile;
