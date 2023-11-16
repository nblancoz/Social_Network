const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected succesfully");
  } catch (error) {
    console.error(error);
    throw new Error("Error connecting the Database");
  }
};

module.exports = { dbConnection };