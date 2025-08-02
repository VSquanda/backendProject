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
    router.get("/createRoom", async (req, res) => {
    try {

     const { name, desciption, addedUsers, createdBy} = req.body;

    } catch (error) {
        console.error("Error displaying all rooms", error);
        res.status(500).json({error: "Can not display rooms."})
    }
    });

module.exports = router;