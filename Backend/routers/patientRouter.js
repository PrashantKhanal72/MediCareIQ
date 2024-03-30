const express = require("express");
const {
  getDoctorList,
  getDoctorById,
} = require("../controllers/patient/patientController");
const { authenticateToken } = require("../middleware/auth");
const { bookSchedule } = require("../controllers/patient/scheduleContoller");
const {
  payForCall,
  verifyToken,
} = require("../controllers/patient/paymentController");

const router = express.Router();

router.get("/get-doctors", getDoctorList);
router.get("/get-doctor-by-id/:id", getDoctorById);
router.get("/book-schedule/:scheduleId", authenticateToken, bookSchedule);

router.post("/pay", authenticateToken, payForCall);
router.post("/verify-token", authenticateToken, verifyToken);

module.exports = router;
