const createError = require("http-errors");
const fs = require("fs");

const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate("category", "_id name status");

    res.status(200).json({
      message: "success",
      data: products,
    });
  } catch (error) {
    res.status(500);
    next(createError(error));
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400);
      next(createError("paremeter not found"));
    } else {
      const product = await Product.findById(id).populate(
        "category",
        "_id name status"
      );

      res.status(200).json({
        message: "success",
        data: product,
      });
    }
  } catch (error) {
    res.status(500);
    next(createError(error));
  }
};

const addProduct = async (req, res, next) => {
  try {
    const { name, price, description, images, category } = req.body;

    let product = await Product.create({
      name,
      price,
      description,
      images: req?.files?.map((file) => file.link),
      category,
    });

    product = await product.populate("category", "_id name status");

    res.status(201).json({
      message: "success",
      data: product,
    });
  } catch (error) {
    if (req.files) {
      req.files.forEach((file) => {
        fs.unlink(
          `${__dirname}/../public/uploads/images/${file.subFolder}/${file.filename}`,
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
      });
    }
    res.status(500);
    next(createError(error));
  }
};

const editProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400);
      next(createError("parameter not found"));
    } else {
      const { name, price, description, category } = req.body;

      const product = await Product.findByIdAndUpdate(
        id,
        {
          name,
          price,
          description,
          category,
        },
        { new: true }
      ).populate("category", "_id name status");

      res.status(200).json({
        message: "success",
        data: product,
      });
    }
  } catch (error) {
    res.status(500);
    next(createError(error));
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400);
      next(createError("parameter not found"));
    } else {
      const product = await Product.findByIdAndDelete(id);

      res.status(200).json({
        message: "success",
        data: product,
      });
    }
  } catch (error) {
    res.status(500);
    next(createError(error));
  }
};

module.exports = {
  getAllProduct,
  getSingleProduct,
  addProduct,
  editProduct,
  deleteProduct,
};
