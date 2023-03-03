const createError = require("http-errors");

const notFound = (req, res, next) => {
  res.status(404);
  next(createError("Routes Not Found"));
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const mode = process.env.NODE_ENV;
  if (mode === "DEVELOPMENT") {
    res.status(statusCode).json({
      status: statusCode,
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(statusCode).json({
      status: statusCode,
      message: err.message,
    });
  }
};

module.exports = {
  notFound,
  errorHandler,
};
