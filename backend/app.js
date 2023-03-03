// external import
const express = require("express");

// internal import
const productRoute = require("./routes/productRouter");
const categoryRoutes = require("./routes/categoryRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");

// express setup
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app routes

app.get("/", (req, res, next) => {
  res.status(200).send("Welcome to my e-commerce api");
});

// category route
app.use("/api/category", categoryRoutes);
// product route
app.use("/api/products", productRoute);

// error handle

// not found error
app.use(notFound);

// error handler
app.use(errorHandler);

module.exports = app;
