<<<<<<< HEAD
const User = require("../models/user");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
=======
const Room = require("../models/room");
const router = require("express").Router();

// GET endpoint for displaying ALL rooms

router.get("/allRooms", async (req, res) => {
    try {
       const foundRooms = await Room.find() 
       if (foundRooms.length === 0) {
        return res.status(400).json ({
            message: "Could not find rooms.",
        });
       }
        res.status(200).json({
            result: foundRooms,
            message: "Rooms fetched sucessfully.",
        });
    } catch (error) {
        console.error("Error displaying all rooms", error);
        res.status(500).json({error: "Can not display rooms."})
    }
    });
    

    //POST endpoint for creating a new room
    router.post("/createRoom", async (req, res) => {
    try {

     const { name, description, addedUsers, createdBy} = req.body;

     if (!name || !description || !createdBy) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newRoom = new Room({
        name,
        description,
        addedUsers,
        createdBy,
    });
     await newRoom.save();
    res.status(201).json({ message: "Room created successfully.", room: newRoom });
    
    } catch (error) {
        console.error("Error creating room", error);
        res.status(500).json({error: "Can not create room."})
    }
    });

module.exports = router;
>>>>>>> de90af5251763d83de417a16cdd805366002f022
