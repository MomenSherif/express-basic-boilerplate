const User = require('../models/User');
const Todo = require('../models/Todo');

const notFoundUserError = () => {
  const err = new Error('No such user with that id!');
  err.statusCode = 404;
  return err;
};

const createUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();

  res.json({ message: 'User was registered successfully ❤' });
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password }).populate('todos');
  const todos = await Todo.find({ userId: user._id }).populate('userId');

  if (!user) {
    const err = new Error('Invalid credentials');
    err.statusCode = 401;
    return next(err);
  }

  res.send({ message: 'Logged in successfully ✌', username, todos });
};

const getUsers = async (req, res) => {
  const users = await User.find({}).select('firstName -_id');
  res.send(users);
};

const deleteUser = async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return next(notFoundUserError());

  res.send({ message: 'Deleted successfully ✌' });
};

const updateUser = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!user) return next(notFoundUserError());

  res.send({ message: 'User was edited successfully ✌', user });
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
  deleteUser,
  updateUser,
  notFoundUserError,
};
