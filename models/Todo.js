const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'You must supply User!'],
    },
    title: {
      type: String,
      trim: true,
      minlength: [10, 'Title must be between 10 & 20 characters!'],
      maxlength: [20, 'Title must be between 10 & 20 characters!'],
      required: [true, 'You must supply title!'],
    },
    tags: [
      {
        type: String,
        maxlength: [10, "Tag shouldn't be more than 10 characters!"],
      },
    ],
  },
  { timestamps: true }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
