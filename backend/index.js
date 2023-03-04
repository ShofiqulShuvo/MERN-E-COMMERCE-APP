// for env files
require("dotenv").config();

const app = require("./app");
const PORT = process.env.PORT || 3500;

// connect with database
const connectDB = require("./config/db");
connectDB();

// run server
app.listen(PORT, () => {
  console.log(
    `Server is running at http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
  );
});
