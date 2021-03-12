const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const whilistRoute = require("./routes/whilistRoute");
const productsRoute = require("./routes/productsRoute");
const cartRoute = require("./routes/cartRoute");
const customerRoute = require("./routes/customerRoute");
const orderRoute = require("./routes/orderRoute");

mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-shard-00-00.yrg2a.mongodb.net:27017,cluster0-shard-00-01.yrg2a.mongodb.net:27017,cluster0-shard-00-02.yrg2a.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-90vt8b-shard-0&authSource=admin&retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => console.log(err));

app.use("/products", productsRoute);
app.use("/cart/", cartRoute);
app.use("/customer", customerRoute);
app.use("/order/:uid", orderRoute);
app.use("/whilist/:uid", whilistRoute);

app.listen(5000, () => {
  console.log("Server has started.");
});
