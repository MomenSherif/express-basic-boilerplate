const { validationResult } = require('express-validator');

// Wrapper for Async functions
const catchErrors = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch(next);
  };
};

const notFoundHandler = (req, res, next) => {
  const err = new Error('Invalid URL');
  err.statusCode = 404;
  next(err);
};

// Handle Mongoose validation
const validationErrorHandler = (err, req, res, next) => {
  if (!err.errors) return next(err);

  const errorKeys = Object.keys(err.errors);

  const errors = errorKeys.reduce((acc, key) => {
    acc[key] = err.errors[key].message;
    return acc;
  }, {});

  res.status(400).send({ errors });
};

/**
 *   Example:
 *      const err = new Error('Erorr Message');
 *      err.statusCode = 401;
 *      next(err);
 */
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  const handledError = err.statusCode < 500;

  res.status(err.statusCode).send({
    message: handledError ? err.message : 'Something Went Wrong!🌚',
  });
};

module.exports = {
  catchErrors,
  validationErrorHandler,
  errorHandler,
  notFoundHandler,
};
