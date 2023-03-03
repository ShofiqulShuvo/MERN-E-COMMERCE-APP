const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter a name for category"],
      lowercase: true,
      trim: true,
      maxLength: [20, "category name doesn/'t exceed 20 caracters"],
      unique: true,
    },
    status: {
      type: String,
      required: [true, "please select a status for your category"],
      enum: {
        values: ["active", "hide"],
      },
      default: "active",
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
