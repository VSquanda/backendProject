const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8080;
const userRoutes = require("./routes/userRoutes");
const roomsRoutes = require("./routes/roomRoutes");
// const messageRoutes = require("./routes/messageRoutes");
const connectDB = require("./config/database");
connectDB();

const app = express();
app.use(express.json()); // parses JSON
app.use(cors());
app.use(express.urlencoded({ extended: true })); // parses URL-encoded data

app.use("/api/users", userRoutes);
app.use("/api/rooms", roomsRoutes);
// app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});


app.listen(PORT, () => {
  console.log("Server is running!");
});
