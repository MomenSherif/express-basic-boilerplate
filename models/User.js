const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

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

// ♥ plugig -> add unique validation error to err.errors
userSchema.plugin(uniqueValidator);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  return { ...user, password: undefined };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
