const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
const { jwtSecretKey } = require('../env');

const jwtVerify = promisify(jwt.verify);

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  const { _id } = await jwtVerify(authorization, jwtSecretKey).catch((err) => {
    err.statusCode = 401;
    err.message = 'Unauthorized';
    next(err);
  });

  const user = await User.findById(_id);
  req.user = user;
  next();
};

module.exports = { authenticate };
