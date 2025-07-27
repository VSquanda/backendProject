const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 8080;
const MONGO = process.env.MONGODB;

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

// POST - /api/login - authenticate a user
app.post("/api/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // find the user by email
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // compare the password with the hashed password
    // save in the database
    const verifyPwd = await bcrypt.compare(password, foundUser.password);

    if (!verifyPwd) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }

    // issue the token to the user
    const token = jwt.sign(
      {
        id: foundUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // send the user and token in the response
    res.status(200).json({
      user: foundUser,
      token: token,
      message: "User logged in successfully!",
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/health", (req, res) => {
  res.send("api is alive!");
});

// GET - /api/public - public route
app.get("/api/public", (req, res) => {
  res.json({
    message: "This is a public route. No authentication required.",
  });
});

// GET - /api/private - private route
app.get("/api/private", validateSession, (req, res) => {
  res.json({
    message: "This is a private route. Authentication required.",
    user: req.user, // the user object attached by the validateSession middleware
  });
});

app.listen(PORT, () => {
  console.log("Server is running!");
});
