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
  getPaymentList,
} = require("../controllers/patient/paymentController");
const { fetchLabData, fetchTestData } = require("../controllers/patient/labDataController");
const { fetchMyPrescription } = require("../controllers/patient/prescriptionController");

const router = express.Router();

router.get("/get-doctors", getDoctorList);
router.get("/get-doctor-by-id/:id", getDoctorById);
router.get("/book-schedule/:scheduleId", authenticateToken, bookSchedule);

router.post("/pay", authenticateToken, payForCall);
router.get("/get-payment-list", authenticateToken, getPaymentList);
router.post("/verify-token", authenticateToken, verifyToken);

router.get("/fetch-lab-data", fetchLabData);
router.get("/fetch-test-data", fetchTestData);

router.get("/fetch-prescriptions",authenticateToken, fetchMyPrescription);

module.exports = router;
