// external import
const express = require("express");

// internal import
const productRoute = require("./routes/productRouter");

// express setup
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app routes

app.get("/", (req, res, next) => {
  res.status(200).send("Welcome to my e-commerce api");
});

// product route
app.use("/api/products", productRoute);

// error handle

// not found error
// error handler

module.exports = app;
