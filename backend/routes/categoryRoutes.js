const express = require("express");
const {
  getCategory,
  addCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const router = express.Router();

// get all category
router.get("/", getCategory);

//  add a category
router.post("/", addCategory);

// edit a category
router.put("/:id", editCategory);

//  delete a category
router.delete("/:id", deleteCategory);

module.exports = router;
