const express = require('express');
const Todos = require('../models/Todos.model'); // Importing Todos model jo mongoose schema define karta hai
const router = express.Router(); // Express router create kiya, jisme hum endpoints define karenge

// POST request → new task add karne ke liye
router.post('/', async (req, res) => {
    const { task } = req.body; // Request body se task ko destructure kiya

    try {
        // Todos collection me ek naya document insert kar rahe hai
        await Todos.create({ task }); // To make async functions act in a sync way
        // Agar task successfully add ho gaya, toh response bhejte hai
        res.status(200).json({
            message: "Task added successfully",
        });
    } catch (error) {
        // Agar koi error aata hai, jaise DB down ho ya validation fail ho
        res.status(503).json({
            message: "Not able to add task currently",
            error: error.message // Error ka message frontend ko bhej rahe hai
        });
    }
})

// GET request → sabhi tasks fetch karne ke liye
router.get('/', async (req, res) => {
    try {
        let todos = await Todos.find(); // MongoDB se saare documents fetch kar rahe hai
        res.status(200).json({
            message: "Tasks fetched successfully",
            todos // Frontend ko saare tasks bhej rahe hai
        });

    } catch (error) {
        // Agar fetch me problem aati hai, jaise DB connect nahi ho raha
        res.status(503).json({
            message: "Not able to fetch tasks!!!",
            error: error.message // Error ka message frontend ko bheja
        });
    }
})

module.exports = router; // Ye router export kiya, taaki app.js ya server.js me use ho sake
