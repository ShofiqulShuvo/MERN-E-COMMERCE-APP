const express = require("express");
const {
  getAllProduct,
  getSingleProduct,
  addProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

// get all product
router.get("/", getAllProduct);

// get single product
router.get("/:id", getSingleProduct);

// add a product
router.post("/", addProduct);

// edit a product
router.put("/:id", editProduct);

// delete product
router.delete("/:id", deleteProduct);

module.exports = router;
