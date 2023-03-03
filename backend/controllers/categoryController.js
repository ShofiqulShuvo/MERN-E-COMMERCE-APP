const { body } = require("express-validator");
const createError = require("http-errors");

const Category = require("../models/categoryModel");

const getCategory = async (req, res, next) => {
  try {
    const category = await Category.find();

    res.status(200).json({
      message: "success",
      data: category,
    });
  } catch (error) {
    res.status(500);
    next(createError(error));
  }
};

const addCategory = async (req, res, next) => {
  try {
    const { name, status } = req.body;

    if (!name || !status) {
      res.status(400);
      next(createError("all data required"));
    } else {
      const category = await Category.create({ name, status });

      res.status(201).json({
        message: "success",
        data: category,
      });
    }
  } catch (error) {
    res.status(500);
    next(createError(error));
  }
};

const editCategory = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400);
      next(createError("id parameter not found"));
    } else {
      const category = await Category.findByIdAndUpdate(
        id,
        {
          name: req?.body?.name,
          status: req?.body?.status,
        },
        { new: true }
      );

      res.status(201).json({
        message: "success",
        data: category,
      });
    }
  } catch (error) {
    res.status(500);
    next(createError(error));
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400);
      next(createError("req parameter not found"));
    } else {
      const category = await Category.findByIdAndDelete(id);

      res.status(200).json({
        message: "success",
      });
    }
  } catch (error) {
    res.status(500);
    next(createError(error));
  }
};

module.exports = {
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
};
