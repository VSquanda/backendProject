const mongoose = require("mongoose");

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
