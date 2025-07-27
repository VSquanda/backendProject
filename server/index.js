const express = require("express");
const mongoose = require("mongoose");

const PORT = 8080;

const app = express();
app.use(express.json()); // parses JSON
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

const newUser = mongoose.model("newUser", newUserSchema);

const newUserSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// POST - /api/signup - create a new user
app.post("/api/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = new User({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 10), // hash the password
    });

    const newUser = await user.save();

    // issue the toke to the user
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      user: newUser,
      token: token,
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/health", (req, res) => {
  res.send("api is alive!");
});

app.listen(PORT, () => {
  console.log("Server is running!");
});
