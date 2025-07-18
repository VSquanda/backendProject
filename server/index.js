const express = require("express");
const mongoose = require("mongoose");

const PORT = 8080;

const app = express();
// connect to mongodb
const connectDB = async () => {
  try {
    const connect = await mongoose.connect("mongodb://localhost:27017/");

    console.log("connected to mongodb!");
  } catch (error) {
    console.error("Error" + error);
    process.exit(1);
  }
};

connectDB();

const messageSchema = new mongoose.Schema({
  when: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: String,
  },
  room: {
    type: String,
    default: "main",
  },
  body: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  addedUsers: [],
});

app.get("/api/health", (req, res) => {
  res.send("api is alive!");
});

app.listen(PORT, () => {
  console.log("Server is running!");
});
