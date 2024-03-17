const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const { getAllAppointments } = require("../controllers/doctor/doctorController");

const router = express.Router();


router.get("/get-appointments",authenticateToken, getAllAppointments);


module.exports = router;
