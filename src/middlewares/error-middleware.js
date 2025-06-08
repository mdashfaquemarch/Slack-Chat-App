import AppError from '../utils/errors/app-error.js'

// Global Error Handling Middleware
const globalErrorHandler = (err, _, res) => {
  let error = { ...err };
  error.message = err.message || "Internal Server Error";

  // Mongoose Bad ObjectId
  if (err.name === "CastError") {
    error = new AppError(`Invalid ${err.path}: ${err.value}.`, 400);
  }

  // Mongoose Duplicate Key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue);
    error = new AppError(`Duplicate field value: ${field}. Use another value!`, 400);
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(el => el.message);
    error = new AppError(`Validation error: ${messages.join(". ")}`, 400);
  }

  // Send error response
  res.status(error.statusCode || 500).json({
    status: error.status || "error",
    message: error.message || "Something went wrong!",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};


export default globalErrorHandler;