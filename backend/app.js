const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).send("Welcome to my e-commerce api");
});

module.exports = app;