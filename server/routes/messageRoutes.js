const Message = require("../models/message");
const router = require("express").Router();
// const authenticateToken = require("../middleware/authenticateToken");

// Display all messages within a room endpoint
router.get("/rooms/:roomId", async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const foundMessages = await Message.find({ room: roomId });
    if (foundMessages.length === 0) {
      return res.status(400).json({
        message: "Could not find messages.",
      });
    }
    res.status(200).json({
      result: foundMessages,
      message: "Messages fetched sucessfully.",
    });
  } catch (error) {
    console.error("Error fetching all messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a message within a room endpoint
router.post("/rooms/:roomId", async (req, res) => {
  try {
    const { user, room, body } = req.body;
    if (!user || !room || !body) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    const newMessage = await Message.create({
      user,
      room,
      body,
    });
    await newMessage.save();
    res.status(201).json({ message: "Message created successfully.", result: newMessage });
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a message within a room endpoint
router.put("/rooms/:roomId/:messageId", async (req, res) => {
  try {
    const { roomId, messageId } = req.params;
    const { body } = req.body;

    if (!body) {
      return res.status(400).json({ message: "Message body is required." });
    }

    const updatedMessage = await Message.findOneAndUpdate(
      { _id: messageId, room: roomId },
      { body },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found." });
    }

    res.status(200).json({
      message: "Message updated successfully.",
      result: updatedMessage,
    });
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a message within a room endpoint
router.delete("/rooms/:roomId/:messageId", async (req, res) => {
  try {
    const { roomId, messageId } = req.params;

    const deletedMessage = await Message.findOneAndDelete({
      _id: messageId,
      room: roomId,
    });

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found." });
    }

    res.status(200).json({
      message: "Message deleted successfully.",
      result: deletedMessage,
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
