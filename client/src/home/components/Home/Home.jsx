import React from "react";
import { useHistory } from "react-router";

import "./Home.css";

const Home = () => {
  const history = useHistory();
  return (
    <section className="home-page">
      <div className="home">
        <div className="home__header home-container">
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
      <section className="choose-us home-container">
        <h2>Why you should choose us</h2>
        <div className="choose-us__reasons">
          <div className="choose-us__reason">
            <i class="fab fa-product-hunt"></i>
            <h4>Best Quality Products</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
              accusantium nulla facere mollitia doloribus aut dolorem voluptas
              eveniet aliquam unde, itaque, rerum quidem iure. Repellat autem
              magni sed ducimus id.
            </p>
          </div>
          <div className="choose-us__reason">
            <i class="fas fa-wrench"></i>
            <h4>Best Services</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
              accusantium nulla facere mollitia doloribus aut dolorem voluptas
              eveniet aliquam unde, itaque, rerum quidem iure. Repellat autem
              magni sed ducimus id.
            </p>
          </div>
          <div className="choose-us__reason">
            <i class="fas fa-truck-moving"></i>
            <h4>Safe and fast delivery</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
              accusantium nulla facere mollitia doloribus aut dolorem voluptas
              eveniet aliquam unde, itaque, rerum quidem iure. Repellat autem
              magni sed ducimus id.
            </p>
          </div>
          <div className="choose-us__reason">
            <i class="fas fa-lock"></i>
            <h4>Secure payment</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
              accusantium nulla facere mollitia doloribus aut dolorem voluptas
              eveniet aliquam unde, itaque, rerum quidem iure. Repellat autem
              magni sed ducimus id.
            </p>
          </div>
          <div className="choose-us__reason">
            <i class="fas fa-money-bill-wave-alt"></i>
            <h4>Reasonable price</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
              accusantium nulla facere mollitia doloribus aut dolorem voluptas
              eveniet aliquam unde, itaque, rerum quidem iure. Repellat autem
              magni sed ducimus id.
            </p>
          </div>
          <div className="choose-us__reason">
            <i class="fas fa-reply-all"></i>
            <h4>7 days refund</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
              accusantium nulla facere mollitia doloribus aut dolorem voluptas
              eveniet aliquam unde, itaque, rerum quidem iure. Repellat autem
              magni sed ducimus id.
            </p>
          </div>
          <div className="choose-us__reason">
            <i class="fas fa-money-bill-alt"></i>
            <h4>cash on delivery</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
              accusantium nulla facere mollitia doloribus aut dolorem voluptas
              eveniet aliquam unde, itaque, rerum quidem iure. Repellat autem
              magni sed ducimus id.
            </p>
          </div>
          <div className="choose-us__reason">
            <i class="fas fa-user"></i>
            <h4>Already thousands of trusted customers</h4>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
              accusantium nulla facere mollitia doloribus aut dolorem voluptas
              eveniet aliquam unde, itaque, rerum quidem iure. Repellat autem
              magni sed ducimus id.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
