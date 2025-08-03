const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    addedUsers: [
      {
        //type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: "User",
      },
    ],
    createdBy: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("room", roomSchema)