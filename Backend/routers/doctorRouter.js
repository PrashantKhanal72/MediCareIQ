const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const {
  getScheduleById,
  getScheduleList,
  createSchedule,
  deleteSchedule,
} = require("../controllers/doctor/scheduleController");
const {
  generateCallToken,
  clearToken,
} = require("../controllers/doctor/paymentController");
const { getMyPatientList } = require("../controllers/doctor/patientController");
const { prescribe } = require("../controllers/doctor/prescriptionController");

const router = express.Router();

router.get("/get-all-schedules", authenticateToken, getScheduleList);
router.get("/get-schedule/:id", authenticateToken, getScheduleById);
router.post("/create-schedule", authenticateToken, createSchedule);
router.delete(
  "/delete-schedule/:scheduleId",
  authenticateToken,
  deleteSchedule
);

router.post("/generate-call-token", authenticateToken, generateCallToken);
router.post("/clear-token",authenticateToken, clearToken);

router.get("/get-patient-list",authenticateToken,getMyPatientList);


router.post("/prescribe",authenticateToken, prescribe);


module.exports = router;
