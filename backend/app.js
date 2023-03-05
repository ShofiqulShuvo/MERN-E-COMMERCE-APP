// external import
const express = require("express");

// internal import
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRouter");

const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");

// express setup
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static file
app.use(express.static("./public"));

// app routes

app.get("/", (req, res, next) => {
  res.status(200).send("Welcome to my e-commerce api");
});

// user route
app.use("/api/user", userRouter);

// category route
app.use("/api/category", categoryRouter);
// product route
app.use("/api/products", productRouter);

// error handle

// not found error
app.use(notFound);

// error handler
app.use(errorHandler);

module.exports = app;
