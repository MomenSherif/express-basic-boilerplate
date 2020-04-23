const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/nodejs-lab', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected To mongoose successfully!'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
