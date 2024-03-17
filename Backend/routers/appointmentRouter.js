const express = require("express");
const { createAppointment } = require("../controllers/appointment/appointmentController");
const { authenticateToken } = require("../middleware/auth");

const router = express.Router();


router.post("/create",authenticateToken, createAppointment);


module.exports = router;
