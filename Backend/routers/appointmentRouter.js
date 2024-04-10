const express = require("express"); // Import Express.js for routing functionality.

const { createAppointment } = require("../controllers/appointment/appointmentController"); // Import the function to create appointments from the controller.
const { authenticateToken } = require("../middleware/auth"); // Import the middleware for token authentication.
 
// Create a new router instance to define route endpoints.
const router = express.Router();

// Defines a route for creating appointments with authentication check.
router.post("/create",authenticateToken, createAppointment);


module.exports = router;
