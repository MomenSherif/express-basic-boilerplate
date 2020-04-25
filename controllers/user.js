const User = require('../models/User');
const Todo = require('../models/Todo');
const customError = require('../helper/customError');

const createUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();

  res.json({ message: 'User was registered successfully ❤' });
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findByCredentials({ username, password });

  if (!user) return next(new customError(401, 'Invalid Credentials'));

  const tokenPromise = user.generateAuthToken();
  const todosPromise = Todo.find({ userId: user._id }).populate('userId');

  const [token, todos] = await Promise.all([tokenPromise, todosPromise]);

  res.send({ message: 'Logged in successfully ✌', username, todos, token });
};

const getUsers = async (req, res) => {
  const users = await User.find({}).select('firstName -_id');
  res.send(users);
};

const deleteUser = async (req, res) => {
  await req.user.remove();
  res.send({ message: 'Deleted successfully ✌' });
};
const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  // to run mongoose pre save middleware, good for password updates
  updates.forEach((update) => (req.user[update] = req.body[update]));
  await req.user.save();
  res.send({ message: 'User was edited successfully ✌', user: req.user });
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
  deleteUser,
  updateUser,
};
