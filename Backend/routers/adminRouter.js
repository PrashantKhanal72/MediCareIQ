const express = require("express");
const { createDoctor } = require("../controllers/admin/doctorController");
const { authenticateToken, isAdmin } = require("../middleware/auth");

const router = express.Router();


router.post("/create-doctor",authenticateToken,isAdmin, createDoctor);


module.exports = router;
