const app = require('./app');

const PORT = 3000;

// Connect to mongoose
require('./db');

// Run express server
app.listen(PORT, () => {
  console.log(`Express server running at port ${PORT} ✌`);
});
