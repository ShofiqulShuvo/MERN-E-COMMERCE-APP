const express = require("express");
const router = express.Router();

const {
  addUser,
  loginUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} = require("../controllers/userController");

const { singleUpload } = require("../middlewares/imageUploader");

const { authUser, userRoleAuth } = require("../middlewares/authMiddleware");

// add a user
router.post("/add", singleUpload("image", "users"), addUser);

// user login
router.post("/login", loginUser);

// get all user
router.get("/", authUser, getAllUser);

// get single user
router.get("/:id", authUser, getSingleUser);

// update single user
router.put("/:id", authUser, singleUpload("image", "users"), updateUser);

// delete a user
router.delete("/:id", authUser, userRoleAuth("admin"), deleteUser);

module.exports = router;
