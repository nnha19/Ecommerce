import React, { useContext, useState } from "react";

import { NavLink, useHistory } from "react-router-dom";
import Logo from "../../../../images/logo.png";
import Context from "../../../../contexts/context";
// import Login from "./Auth/Login";
// import Customer from "./Customer/Customer";

import "./NavItems.css";

// const NavItems = (props) => {
//   const history = useHistory();
//   const context = useContext(Context);

//   const goToCartHandler = () => {
//     if (context.authenticated) {
//       context.authenticated && history.push("/cart");
//     } else {
//       context.toggleLogin();
//     }
//   };

//   return (
//     <>
//       <NavLink to="/">
//         <li className="logo">
//           <img className="nav__logo" src={Logo} alt="Logo" />
//           <h1 className="nav__name">May Myo Vision</h1>
//         </li>
//       </NavLink>
//       <div className="nav__side">
//         <NavLink className="nav__link" to="/">
//           <li>Home</li>
//         </NavLink>
//         <NavLink className="nav__link" to="/products">
//           <li>Shop</li>
//         </NavLink>
//         {!context.authenticated ? <Login /> : null}

//         <i
//           onClick={goToCartHandler}
//           className="shopping-cart fas fa-shopping-cart"
//         >
//           {context.cartItemAmount ? (
//             <span className="shopping-cart__item-qty">
//               {context.cartItemAmount}
//             </span>
//           ) : null}
//         </i>
//         {context.authenticated && <Customer curUser={context.curUser} />}
//       </div>
//     </>
//   );
// };

const LogoNavItem = () => {
  return (
    <NavLink to="/">
      <li className="logo">
        <img className="nav__logo" src={Logo} alt="Logo" />
        <h1 className="nav__name">MMV</h1>
      </li>
    </NavLink>
  );
};

const NavItemLink = ({ className, style, children, to }) => {
  return (
    <NavLink style={style} className={`${className}`} to={to}>
      <li>{children}</li>
    </NavLink>
  );
};

const NavItemCart = () => {
  const history = useHistory();
  const context = useContext(Context);
  const goToCartHandler = () => {
    if (context.authenticated) {
      context.authenticated && history.push("/cart");
    } else {
      context.toggleLogin();
    }
  };
  return (
    <i onClick={goToCartHandler} className="shopping-cart fas fa-shopping-cart">
      {context.cartItemAmount ? (
        <span className="shopping-cart__item-qty">
          {context.cartItemAmount}
        </span>
      ) : null}
    </i>
  );
};

export { LogoNavItem, NavItemLink, NavItemCart };
