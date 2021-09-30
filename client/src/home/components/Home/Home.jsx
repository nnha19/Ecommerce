import React from "react";
import { useHistory } from "react-router";

import "./Home.css";

const Home = () => {
  const history = useHistory();
  return (
    <section className="home-page">
      <div className="home">
        <div className="home__header">
          <h2>
            <span>May Myo Vision</span>
            <span className="home__main-header">Sunglasses Store</span>
          </h2>
          <button
            onClick={() => history.push("/products")}
            className="home__btn"
          >
            <i className="fas fa-shopping-cart"></i>
            Shop
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
