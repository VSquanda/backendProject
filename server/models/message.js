const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  when: {
    type: Date,
    default: Date.now,
    required: true,
  },
  user: {
    type: String,
    required: true,
    ref: "User",
  },
  room: {
    type: String,
    ref: "Room",
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Message", messageSchema);
