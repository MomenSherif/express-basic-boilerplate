const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { jwtSecretKey } = require('../env');

const jwtSign = promisify(jwt.sign);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'You must supply username!'],
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'You must supply password!'],
  },
  firstName: {
    type: String,
    trim: true,
    minlength: [3, 'First name must be between 3 & 15 characters!'],
    maxlength: [15, 'First name must be between 3 & 15 characters!'],
    required: [true, 'You must supply firstName!'],
  },
  age: {
    type: Number,
    min: [13, 'Minimum age is 13'],
  },
});

userSchema.virtual('todos', {
  ref: 'Todo',
  localField: '_id',
  foreignField: 'userId',
});

userSchema.pre('save', async function () {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

// ♥ plugig -> add unique validation error to err.errors
userSchema.plugin(uniqueValidator);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  return { ...user, password: undefined };
};

userSchema.methods.generateAuthToken = function () {
  return jwtSign({ _id: this._id }, jwtSecretKey, { expiresIn: '1h' });
};

userSchema.statics.findByCredentials = async ({ username, password }) => {
  const user = await User.findOne({ username: username });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);

  return isMatch ? user : null;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
