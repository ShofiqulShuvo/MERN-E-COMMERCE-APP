const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// user auth middleware
const authUser = async (req, res, next) => {
  try {
    // checking is authorization exist and start with Bearer
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      res.status(401);
      next(createError("please first login"));
    }

    // checking token exists or not
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401);
      next(createError("please first login"));
    }

    // decode token and find user
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id }).select("-password");

    // if not found user
    if (!user) {
      res.status(401);
      next(createError("please logout then login again"));
    }

    // check if user is blocked or not
    if (user && user.status === "blocked") {
      res.status(401);
      next(createError("your account is blocked"));
    }

    // all ok then send user to next middleware
    req.user = user;
    next();
  } catch (error) {
    res.status(500);
    next(createError(error));
  }
};

// user role auth middleware
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
