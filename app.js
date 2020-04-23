const express = require('express');
const morgan = require('morgan');

const userRouter = require('./router/user');
const todoRouter = require('./router/todo');

const {
  validationErrorHandler,
  errorHandler,
  notFoundHandler,
} = require('./handlers/error');

const app = express();

app.use(express.json());
app.use(morgan(':url :method :status :date'));

app.use('/users', userRouter);
app.use('/todos', todoRouter);

// 404 route handler
app.use(notFoundHandler);

app.use(validationErrorHandler);
app.use(errorHandler);
module.exports = app;
