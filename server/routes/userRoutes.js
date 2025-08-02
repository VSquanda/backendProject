const User = require("../models/user");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
// POST - /api/signup - create a new user
router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // what if the user already exists

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
router.post("/login", async (req, res) => {
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

module.exports = router;
