const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
const dbConnection = () => {
  try {
    const connect = mongoose.connect(process.env.DB_HOST);
    return connect
      ? console.log("Database connected successfully")
      : "Database not connect";
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
