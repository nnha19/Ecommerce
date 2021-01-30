//Random Products Page

import React, { useState, useEffect } from "react";

import AllProducts from "../../components/AllProducts/AllProducts";

const AllProductsPage = (props) => {
  const [allProducts, setAllProducts] = useState("");

  useEffect(() => {
    setAllProducts([
      {
        brand: "Ray Ban",
        id: 1,
        price: 25000,
        Type: "real glasses",
        img:
          "https://images.unsplash.com/photo-1526323231297-86ea84cf2647?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8cmF5YmFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
      {
        brand: "Ray Ban",
        id: 1,
        price: 25000,
        Type: "real glasses",
        img:
          "https://images.unsplash.com/photo-1526323231297-86ea84cf2647?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8cmF5YmFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
      {
        brand: "Ray Ban",
        id: 1,
        price: 25000,
        Type: "real glasses",
        img:
          "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8YW8lMjBzdW5nbGFzc2VzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
      {
        brand: "American Optical",
        id: 1,
        price: 25000,
        Type: "real glasses",
        img:
          "https://images.unsplash.com/photo-1579876145085-2c1fda8a27d1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzB8fHJheWJhbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      },
    ]);
  }, []);

  return (
    <>
      <AllProducts allProducts={allProducts} />
    </>
  );
};

export default AllProductsPage;
