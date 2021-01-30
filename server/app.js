const express = require("express");
const productsRoute = require("./routes/productsRoute");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://webtek:maymyopyin123@cluster0.yrg2a.mongodb.net/sunglasses-ecommerce?retryWrites=true&w=majority",
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

app.listen(5000, () => {
  console.log("Server has started.");
});
