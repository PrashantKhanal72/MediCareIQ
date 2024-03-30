const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const {
  getScheduleById,
  getScheduleList,
  createSchedule,
  deleteSchedule,
} = require("../controllers/doctor/scheduleController");

const router = express.Router();

router.get("/get-all-schedules", authenticateToken, getScheduleList);
router.get("/get-schedule/:id", authenticateToken, getScheduleById);
router.post("/create-schedule", authenticateToken, createSchedule);
router.delete(
  "/delete-schedule/:scheduleId",
  authenticateToken,
  deleteSchedule
);

module.exports = router;
