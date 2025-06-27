import AppError from '../utils/errors/app-error.js';

export const errorHandler = (err, req, res, next) => {
  // Start with the original error or create a new AppError
  let error = err instanceof AppError ? err : new AppError(err.message || 'Something went wrong', err.statusCode || 500);

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    const message = `Invalid ${err.path}: ${err.value}`;
    error = new AppError(message, 400);
  }

  // Handle duplicate key error (MongoDB)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `Duplicate value for '${field}': '${value}'. Please use another value!`;
    error = new AppError(message, 400);
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((el) => el.message);
    const message = `Validation error: ${messages.join('. ')}`;
    error = new AppError(message, 400);
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new AppError('Invalid token. Please log in again!', 401);
  }

  if (err.name === 'TokenExpiredError') {
    error = new AppError('Your token has expired. Please log in again!', 401);
  }

  // Handle bad JSON payload
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    error = new AppError('Invalid JSON payload', 400);
  }

  // Log errors for debugging (but not in tests)
  if (process.env.NODE_ENV !== 'test' && error.statusCode >= 500) {
    console.error('Server Error:', {
      message: error.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
      timestamp: new Date().toISOString()
    });
  }

  // Don't expose sensitive error details in production for server errors
  const message = process.env.NODE_ENV === 'production' && error.statusCode >= 500 
    ? 'Something went wrong on the server' 
    : error.message;

  // Send response - match your controller response format
  res.status(error.statusCode).json({
    success: false,
    status: error.status,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      error: err 
    })
  });
};