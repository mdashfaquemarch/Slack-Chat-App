// utils/errors/error-handler.js
import AppError from "../utils/errors/app-error.js";

export const errorHandler = (err, _, res, ) => {
  let error = { ...err };

  // Ensure message is copied properly
  error.message = err.message;

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    error = new AppError(`Invalid ${err.path}: ${err.value}`, 400);
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `Duplicate value for '${field}': '${value}'. Please use another value!`;
    error = new AppError(message, 400);
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((el) => el.message);
    error = new AppError(`Validation error: ${messages.join(". ")}`, 400);
  }

  // Final fallback error response
  res.status(error.statusCode || 500).json({
    status: error.status || "error",
    message: error.message || "Something went wrong",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
