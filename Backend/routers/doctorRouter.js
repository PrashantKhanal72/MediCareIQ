const express = require("express"); // Import the Express framework to handle routing.

const { authenticateToken } = require("../middleware/auth"); // Import authentication middleware to validate JWT tokens.

// Importing functions from the schedule controller to manage doctor schedules.
const {
  getScheduleById,
  getScheduleList,
  createSchedule,
  deleteSchedule,
} = require("../controllers/doctor/scheduleController");

// Importing functions from the payment controller related to call token management.
const {
  generateCallToken,
  clearToken,
} = require("../controllers/doctor/paymentController");

// Importing function from the patient controller to retrieve the doctor's patient list.
const { getMyPatientList } = require("../controllers/doctor/patientController");

// Importing function from the prescription controller to handle prescribing medication.
const { prescribe } = require("../controllers/doctor/prescriptionController");

// Create a new router instance to define routes specific to doctors.
const router = express.Router();

// Schedule-related routes
router.get("/get-all-schedules", authenticateToken, getScheduleList); // Retrieves all schedules for the authenticated doctor.
router.get("/get-schedule/:id", authenticateToken, getScheduleById); // Retrieves a specific schedule by its ID.
router.post("/create-schedule", authenticateToken, createSchedule); // Allows the doctor to create a new schedule.
// Allows the doctor to delete an existing schedule.
router.delete(
  "/delete-schedule/:scheduleId",
  authenticateToken,
  deleteSchedule
);

// Call token-related routes
router.post("/generate-call-token", authenticateToken, generateCallToken);  // Generates a call token for initiating video session.
router.post("/clear-token",authenticateToken, clearToken); // Clears a call token after the consultation is finished.

// Patient management route
router.get("/get-patient-list",authenticateToken,getMyPatientList); // Retrieves a list of patients associated with the authenticated doctor.

// Prescription route
router.post("/prescribe",authenticateToken, prescribe); // Allows the doctor to create prescriptions for their patients.


module.exports = router;
