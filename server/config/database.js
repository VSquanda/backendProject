const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// connect to mongodb
const connectDB = async () => {
  const MONGODB = process.env.MONGODB;

  try {
    await mongoose.connect(MONGODB);
    console.log("connected to mongodb!");
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = connectDB;
