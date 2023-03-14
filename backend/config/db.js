const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(process.env.MONGO_URI)
    .then((c) => {
      console.log(
        `connected with Database host: ${c.connection.host} port: ${c.connection.port}`
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
