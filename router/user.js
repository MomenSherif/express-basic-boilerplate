const express = require('express');
const { catchErrors } = require('../handlers/error');
const {
  createUser,
  loginUser,
  getUsers,
  deleteUser,
  updateUser,
} = require('../controllers/user');

const router = express.Router();

router.post('/register', catchErrors(createUser));

router.post('/login', catchErrors(loginUser));

router.get('/', catchErrors(getUsers));

router.delete('/:id', catchErrors(deleteUser));

router.patch('/:id', catchErrors(updateUser));

module.exports = router;
