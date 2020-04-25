// load environment variables
require('dotenv').config();

const app = require('./app');
const { port = 3000 } = require('./config');

// Connect to mongoose
require('./db');

// Run express server
app.listen(port, () => {
  console.log(`Express server running at port ${port} ✌`);
});
