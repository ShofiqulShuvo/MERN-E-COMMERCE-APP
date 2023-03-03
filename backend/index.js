// for env files
require("dotenv").config({
  path: "backend/.env",
});

const app = require("./app");
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Server is running at http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
  );
});
