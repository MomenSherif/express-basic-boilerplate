const express = require('express');
const { catchErrors } = require('../handlers/error');
const {
  createTodo,
  getTodosByUserID,
  getTodos,
  deleteTodo,
  updateTodo,
} = require('../controllers/todo');

const router = express.Router();

router.get('/', catchErrors(getTodos));

router.post('/', catchErrors(createTodo));

router.get('/:userId', catchErrors(getTodosByUserID));

router.delete('/:id', catchErrors(deleteTodo));

router.patch('/:id', catchErrors(updateTodo));

module.exports = router;
