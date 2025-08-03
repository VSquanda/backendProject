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

    } catch (error) {
        console.error("Error creating room", error);
        res.status(500).json({error: "Can not create room."})
    }
    });

module.exports = router;