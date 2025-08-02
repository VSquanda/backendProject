const jwt = require("jsonwebtoken");
const user = require("../models/user");
const bcrypt = require("bcrypt");
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');

// load environment variables
dotenv.config()

const app = express();

const PORT = process.env.PORT || 8080
const MONGO = process.env.MONGODB;

console.log(`MONGO: ${MONGO}`)

// Middleware to parse JSON request bodies
app.use(express.json());

// connect to MongoDB
mongoose.connect(`${MONGO}/anotherMongooseTest`)
const db = mongoose.connection
db.once("open", () => {
    console.log(`connected: ${MONGO}`)
})

const validateSession = async (req, res, next) => {
    try {
        // take the token provided by the request object
        const token = req.headers.authorization

        // check the status of the token
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)

        // provide response
        const user = await User.findById(decodedToken.id)

        if (!user) throw new Error("User not found");

        req.user = user; // attach the user to the request object

        return next(); // call the next middleware or route handler
    } catch (error) {
        res.json({
            error: "Unauthorized access"
        })
    }
}

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
})

module.exports = validateSession;