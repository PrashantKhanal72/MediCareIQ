const pool = require("../../database/db");

// Import a utility function for generating random strings.
const { generateRandomString } = require("../../utils");

// Function to get a list of payments for the doctor.
const getPaymentList = async (req, res) => {
  try {
    const profile_id = req.user.profile_id; // Doctor's profile ID from the authenticated user.

    // SQL query to select all payment records for the doctor.
    const [rows] = await pool.execute(
      "SELECT * FROM payments WHERE doctor_id = ?",
      [profile_id]
    );


    // Check if any payment records exist and respond accordingly.
    if (rows.length > 0) {
      res.status(200).json(rows); // Send payment records if found.
    } else {
      res.status(404).json({ message: "No payments found for this patient" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send an error response if an exception occurs.
  }
};

// Function to generate a token for call initiation and create a payment record.
const generateCallToken = async (req, res) => {
  try {
    const { patientId } = req.body; // Get patient ID from the request body.

    // Insert a new payment record with a random token and a fixed amount
    const [result] = await pool.execute(
      "INSERT INTO payments ( patient_id, token, amount) VALUES (?, ?, ?)",
      [patientId, generateRandomString(), 1000]
    );

    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to clear the call token and update call status in the payment record.
const clearToken = async (req, res) => {
  try {
    const profile_id = req.user.profile_id; // Doctor's profile ID from authenticated user.
    const { token, patient_id } = req.body; // Get token and patient ID from the request body.

    // Retrieve the doctor's profile to determine their type(Physician or Specialist).
    const [doctor] = await pool.execute(
      "SELECT * FROM profile WHERE profile_id = ?",
      [profile_id]
    );

    if (doctor.length === 0) {
      res.status(404).json({ message: "No doctor found" });
    }

    // Update call status based on the doctor's type.
    if (doctor[0].doctor_type === "Specialist") {
      const [specialist] = await pool.execute(
        "UPDATE payments SET specialist_call = 0 WHERE token = ? ",
        [token]
      );

      console.log(specialist);
    } else {
      const [physician] = await pool.execute(
        "UPDATE payments SET physician_call = 0 WHERE token = ? ",
        [token]
      );

      console.log(physician);
    }

    //link the doctor with the patient in the doctor_patient table.
    const [doctor_patient] = await pool.execute(
      `INSERT INTO doctor_patient (
        doctor_id,
        patient_id
      ) VALUES (?,?)`,
      [profile_id, patient_id]
    );

    console.log("Doctor patient",doctor_patient);
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPaymentList, generateCallToken, clearToken };
