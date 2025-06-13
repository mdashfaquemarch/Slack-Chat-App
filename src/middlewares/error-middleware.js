import AppError from '../utils/errors/app-error.js';

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;
  error.status = err.status || 'error';

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    error = new AppError(`Invalid ${err.path}: ${err.value}`, 400);
  }

  // Handle duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    error = new AppError(
      `Duplicate value for '${field}': '${value}'. Please use another value!`,
      400
    );
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((el) => el.message);
    error = new AppError(`Validation error: ${messages.join('. ')}`, 400);
  }

  // Handle bad JSON payload
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    error = new AppError('Invalid JSON payload', 400);
  }

  // Final fallback
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message || 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
