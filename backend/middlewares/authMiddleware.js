const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const authUser = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        res.status(401);
        next(createError("please first login"));
      } else {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded.id }).select(
          "-password"
        );

        if (user.status === "blocked") {
          res.status(401);
          next(createError("your account is blocked"));
        } else {
          req.user = user;
          next();
        }
      }
    } else {
      res.status(401);
      next(createError("please first login"));
    }
  } catch (error) {
    res.status(500);
    next(createError(error));
  }
};

const userRoleAuth =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      next(createError("you don\t have access to perform this task"));
    } else {
      next();
    }
  };

module.exports = {
  authUser,
  userRoleAuth,
};
