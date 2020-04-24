const express = require('express');
const { catchErrors } = require('../handlers/error');
const { authenticate } = require('../middlewares/auth');
const {
  createTodo,
  getTodosByUserID,
  getTodos,
  deleteTodo,
  updateTodo,
} = require('../controllers/todo');

const router = express.Router();

router.get('/', catchErrors(getTodos));

router.post('/', authenticate, catchErrors(createTodo));

router.get('/:userId', authenticate, catchErrors(getTodosByUserID));

router.delete('/:id', authenticate, catchErrors(deleteTodo));

router.patch('/:id', authenticate, catchErrors(updateTodo));

module.exports = router;
