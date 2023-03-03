const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter a product name"],
      trim: true,
      maxLength: [80, "name cannot exceed 80 caracter"],
    },
    price: {
      type: Number,
      required: [true, "please enter your product price"],
    },
    description: {
      type: String,
      required: [true, "please enter some description for product"],
    },
    images: {
      type: String,
    },
    category: {
      type: mongoose.Types.ObjectId,
      required: [true, "please select a category for product"],
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
