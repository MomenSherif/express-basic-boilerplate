const express = require('express');
const { catchErrors } = require('../handlers/error');
const {
  validateRegisterationCredentials,
  validateLoginCredentials,
} = require('../middlewares/user');

const { authenticate } = require('../middlewares/auth');

const {
  createUser,
  loginUser,
  getUsers,
  deleteUser,
  updateUser,
} = require('../controllers/user');

const router = express.Router();

router.post(
  '/register',
  validateRegisterationCredentials,
  catchErrors(createUser)
);

router.post('/login', validateLoginCredentials, catchErrors(loginUser));

router.get('/', authenticate, catchErrors(getUsers));

router.delete('/', authenticate, catchErrors(deleteUser));

router.patch('/', authenticate, catchErrors(updateUser));

module.exports = router;
