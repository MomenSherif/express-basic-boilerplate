const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
const { jwtSecretKey } = require('../config');
const customError = require('../helper/customError');

const jwtVerify = promisify(jwt.verify);

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  const { _id } = await jwtVerify(authorization, jwtSecretKey).catch((err) => {
    next(new customError(401, 'Unauthorized'));
  });

  const user = await User.findById(_id);
  req.user = user;
  next();
};

module.exports = { authenticate };
