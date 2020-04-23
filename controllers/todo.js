const Todo = require('../models/Todo');
const User = require('../models/User');

// TODO: add to Utils as function('error msg')
const { notFoundUserError } = require('./user');

const notFoundTodoError = () => {
  const err = new Error('No such todo with that id!');
  err.statusCode = 404;
  return err;
};

const createTodo = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  if (!user) return next(notFoundUserError());

  req.body.userId = user._id;
  const todo = new Todo(req.body);
  await todo.save();
  res.send(todo);
};

const getTodosByUserID = async (req, res) => {
  const todos = await Todo.find({ userId: req.params.userId });

  res.send(todos);
};

const getTodos = async (req, res) => {
  const { limit = 10, skip = 0 } = req.query;

  const todos = await Todo.find({})
    .skip(+skip)
    .limit(+limit);

  res.json(todos);
};

const deleteTodo = async (req, res, next) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) return next(notFoundTodoError());

  res.send({ message: 'Deleted Successfully ✌' });
};

const updateTodo = async (req, res, next) => {
  const todo = await Todo.findOneAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!todo) return next(notFoundTodoError());

  res.send({ message: 'Updated Successfully ✌' });
};
module.exports = {
  createTodo,
  getTodosByUserID,
  deleteTodo,
  updateTodo,
  getTodos,
};
