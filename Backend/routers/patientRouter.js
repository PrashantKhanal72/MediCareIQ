const express = require("express"); // Importing Express for routing.
const {
  getDoctorList,
  getDoctorById,
} = require("../controllers/patient/patientController");

const { authenticateToken } = require("../middleware/auth"); // Importing the authentication middleware.

// Importing controller functions for various patient actions.
const { bookSchedule } = require("../controllers/patient/scheduleContoller");
const {
  payForCall,
  verifyToken,
  getPaymentList,
} = require("../controllers/patient/paymentController");
const { fetchLabData, fetchTestData } = require("../controllers/patient/labDataController");
const { fetchMyPrescription } = require("../controllers/patient/prescriptionController");

// Creating a new router instance.
const router = express.Router();

//Defining Patient Routes

// Route to get a list of doctors.
router.get("/get-doctors", getDoctorList);
// Route to get details of a specific doctor by their ID.
router.get("/get-doctor-by-id/:id", getDoctorById);
// Route to book a schedule. Authentication is required to book a schedule.
router.get("/book-schedule/:scheduleId", authenticateToken, bookSchedule);

// Payment-related routes
router.post("/pay", authenticateToken, payForCall); // Route to initiate a payment process.
router.get("/get-payment-list", authenticateToken, getPaymentList); // Route to fetch the list of payments.
router.post("/verify-token", authenticateToken, verifyToken); // Route to verify payment tokens.

// Lab data-related routes
router.get("/fetch-lab-data", fetchLabData); // Route to fetch lab data, no authentication required here.
router.get("/fetch-test-data", fetchTestData); // Route to fetch detailed test data from labs.

// Prescription-related route
router.get("/fetch-prescriptions",authenticateToken, fetchMyPrescription); // Route to fetch the authenticated patient's prescriptions.

module.exports = router;
