const Todo = require('../models/Todo');
const customError = require('../helper/customError');

const createTodo = async (req, res) => {
  req.body.userId = req.user._id;
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
  const todo = await Todo.findOneAndDelete({
    _id: req.params.id,
    userId: req.user._id,
  });

  // TODO: should be moved to middleware
  if (!todo) return next(new customError(404, 'No such todo with that id! 🙄'));

  res.send({ message: 'Deleted Successfully ✌' });
};

const updateTodo = async (req, res, next) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );

  if (!todo) return next(new customError(404, 'No such todo with that id! 🙄'));

  res.send({ message: 'Updated Successfully ✌' });
};
module.exports = {
  createTodo,
  getTodosByUserID,
  deleteTodo,
  updateTodo,
  getTodos,
};
