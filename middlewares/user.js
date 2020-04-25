const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');

const validateRegisterationCredentials = validateRequest([
  body('password').notEmpty().withMessage('password must be provided!'),
  body('username').notEmpty().withMessage('username must be provided!'),
  body('firstName').notEmpty().withMessage('firstName must be provided!'),
]);

const validateLoginCredentials = validateRequest([
  body('password').notEmpty().withMessage('password must be provided!'),
  body('username').notEmpty().withMessage('username must be provided!'),
]);

module.exports = {
  validateRegisterationCredentials,
  validateLoginCredentials,
};
