const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

const whilistRoute = require("./routes/whilistRoute");
const productsRoute = require("./routes/productsRoute");
const cartRoute = require("./routes/cartRoute");
const customerRoute = require("./routes/customerRoute");
const orderRoute = require("./routes/orderRoute");
const couponRoute = require("./routes/couponRoute");
const questionRoute = require("./routes/questionRoute");
const reviewsRoute = require("./routes/reviewsRoute");

mongoose
  .connect(process.env.CONNECT_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => console.log(err));

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/products", productsRoute);
app.use("/product/:productId/question", questionRoute);
app.use("/product/:productId/review", reviewsRoute);
app.use("/cart/", cartRoute);
app.use("/customer", customerRoute);
app.use("/order/:uid", orderRoute);
app.use("/whilist/:uid", whilistRoute);
app.use("/coupon", couponRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server has started on ${process.env.PORT || "5000"}`);
});
