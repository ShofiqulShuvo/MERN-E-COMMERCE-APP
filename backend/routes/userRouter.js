const express = require("express");
const router = express.Router();

const {
  addUser,
  loginUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
  changePass,
  loginUserUsingToken,
  getUsers,
} = require("../controllers/userController");

const { singleUpload } = require("../middlewares/imageUploader");

const { authUser, userRoleAuth } = require("../middlewares/authMiddleware");

// add a user
router.post("/add", singleUpload("image", "users"), addUser);

// user login
router.post("/login", loginUser);

// user login using token
router.post("/tokenlogin", authUser, loginUserUsingToken);

// get all user
router.get("/", authUser, getUsers);

// get single user
router.get("/:id", authUser, getSingleUser);

// update single user
router.put("/:id", authUser, singleUpload("image", "users"), updateUser);

// change Password
router.put("/password/:id", authUser, changePass);

// delete a user
router.delete("/:id", authUser, userRoleAuth("admin"), deleteUser);

module.exports = router;
