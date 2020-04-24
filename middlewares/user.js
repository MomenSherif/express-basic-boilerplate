const { body } = require('express-validator');
const { expressValidatorErrorHandler } = require('../handlers/error');

const validateRegisterationCredentials = [
  body('password').notEmpty().withMessage('password must be provided!'),
  body('username').notEmpty().withMessage('username must be provided!'),
  body('firstName').notEmpty().withMessage('firstName must be provided!'),
  expressValidatorErrorHandler,
];

const validateLoginCredentials = [
  body('password').notEmpty().withMessage('password must be provided!'),
  body('username').notEmpty().withMessage('username must be provided!'),
  expressValidatorErrorHandler,
];

module.exports = {
  validateRegisterationCredentials,
  validateLoginCredentials,
};
