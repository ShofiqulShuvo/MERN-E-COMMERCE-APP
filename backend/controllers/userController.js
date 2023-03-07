const createError = require("http-errors");
const bcrypt = require("bcrypt");
const fs = require("fs");

const User = require("../models/userModel");
const { generateToken } = require("../config/generateToken");

// adding a user
const addUser = async (req, res, next) => {
  try {
    const { name, email, mobile, password, role, status } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      next(createError("please enter required field"));
    } else {
      const emailCheck = await User.findOne({ email });
      const mobileCheck = await User.findOne({ mobile });

      if (emailCheck) {
        res.status(400);
        next(createError("email already used by a user"));
      }

      if (mobileCheck) {
        res.status(400);
        next(createError("mobile number already used by a user"));
      }

      const hashPass = await bcrypt.hash(password, 10);

      const image = req.file
        ? { filename: req.file.filename, link: req.file.link }
        : undefined;

      const user = await User.create({
        name,
        email,
        mobile,
        role,
        status,
        password: hashPass,
        image,
      });

      res.status(201).json({
        message: "success",
        data: user,
      });
    }
  } catch (error) {
    if (req.file) {
      const filePath = `${__dirname}/../public/uploads/images/${req.file.subFolder}/${req.file.filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    res.status(500);
    next(createError(error));
  }
};

// login user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      next(createError("please enter email & password"));
    } else {
      const user = await User.findOne({ email });

      if (!user) {
        res.status(401);
        next(createError("invalid email or password"));
      } else if (user.status === "blocked") {
        res.status(401);
        next(createError("Admin Blocked your account"));
      } else {
        const checkPass = await bcrypt.compare(password, user.password);

        if (!checkPass) {
          res.status(401);
          next(createError("invalid email or password"));
        } else {
          const token = generateToken(user._id);

          res.status(200).json({
            message: "success",
            token: token,
            data: user,
          });
        }
      }
    }
  } catch (error) {
    res.status(500);
    next(createError(error));
  }
};

// login user using token
const loginUserUsingToken = async (req, res, next) => {
  try {
    const user = req.user;
    const token = generateToken(user._id);

    res.status(200).json({
      message: "success",
      token: token,
      data: user,
    });
  } catch (error) {
    res.status(500);
    next(createError(error));
  }
};

// get all user
const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } })
      .populate("updateBy", "_id name email")
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "success",
      data: users,
    });
  } catch (error) {
    res.status(500);
    next(createError(error));
  }
};

// get single user
const getSingleUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400);
      next(createError("required data not found"));
    } else {
      const user = await User.findOne({ _id: id })
        .populate("updateBy", "name email _id")
        .select("-password");

      res.status(200).json({
        message: "success",
        data: user,
      });
    }
  } catch (error) {
    res.status(500);
    next(createError(error));
  }
};

// update a user
const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400);
      next(createError("required data not found"));
    } else {
      const authUser = req.user;
      const authUserId = authUser._id.valueOf();

      if (authUser.role === "admin" || authUserId === id) {
        const { name, email, mobile, role, status } = req.body;

        const image = req.file
          ? { filename: req.file.filename, link: req.file.link }
          : undefined;

        const user = await User.findOne({ _id: id });

        const updateUser = await User.findByIdAndUpdate(
          id,
          {
            name,
            email,
            mobile,
            image,
            role,
            status,
            updateBy: authUserId,
          },
          { new: true }
        )
          .select("-password")
          .populate("updateBy", "name _id email");

        if (req.file && user.image) {
          const filePath = `${__dirname}/../public/uploads/images/users/${user.image.filename}`;
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log("file unlink error");
            }
          });
        }

        res.status(201).json({
          message: "success",
          data: updateUser,
        });
      } else {
        res.status(403);
        next(createError("you don't have permision to perform this task "));
      }
    }
  } catch (error) {
    res.status(500);
    next(createError(error));
  }
};

// change password
const changePass = async (req, res, next) => {
  try {
    const authUser = req.user;
    const authUserId = authUser._id.valueOf();
    const id = req.params.id;
    const { password, newPassword } = req.body;

    if (!id || !password || !newPassword) {
      res.status(400);
      next(createError("insuficient data"));
    } else {
      if (authUser.role === "admin" || authUserId === id) {
        const user = await User.findOne({ _id: id });

        const checkPass = await bcrypt.compare(password, user.password);

        if (!checkPass) {
          res.status(401);
          next(createError("current password not matched"));
        } else {
          const hashPass = await bcrypt.hash(newPassword, 10);

          const user = await User.findByIdAndUpdate(id, { password: hashPass });

          res.status(201).json({
            message: "success",
          });
        }
      } else {
        res.status(403);
        next(createError("yo don\t have permision to perform this task"));
      }
    }
  } catch (error) {
    res.status(500);
    next(createError(error));
  }
};

// delete a user
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400);
      next(createError("required data not found"));
    } else {
      const user = await User.findByIdAndDelete(id);

      const filePath = `${__dirname}/../public/uploads/images/users/${user.image.filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("file unlink error");
        }
      });

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
  addUser,
  loginUser,
  loginUserUsingToken,
  getAllUser,
  getSingleUser,
  updateUser,
  changePass,
  deleteUser,
};
