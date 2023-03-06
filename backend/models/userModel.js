const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "must be provide user name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "must be provide user email"],
      trim: true,
      lowercase: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: [true, "must be provide user mobile number"],
      trim: true,
      unique: true,
    },
    image: {
      type: Object,
    },
    password: {
      type: String,
      required: [true, "must be provide user password"],
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
      },
      default: "user",
    },
    status: {
      type: String,
      enum: {
        values: ["active", "blocked"],
      },
      default: "active",
    },
    updateBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
