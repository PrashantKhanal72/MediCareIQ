const pool = require("../../database/db");

// asynchronous function to get a list of patients for the logged-in doctor, including their prescriptions.
const getMyPatientList = async (req, res) => {
  try {
    // Extract the profile ID of the doctor from the request object
    const profile_id = req.user.profile_id;

     // Execute a SQL query to get all patients associated with the doctor.
    const [patients] = await pool.execute(
      "SELECT p.* FROM doctor_patient dp JOIN profile p ON dp.patient_id = p.profile_id WHERE dp.doctor_id = ?",
      [profile_id]
    );

     // Iterate over each patient to fetch their prescriptions in parallel using Promise.all.
    const patientWithPrescriptions = await Promise.all(
      patients.map(async (row) => {
        // For each patient, get their prescriptions from the database where the doctor_id and patient_id match.
        const [prescription] = await pool.execute(
          "SELECT * FROM prescription WHERE doctor_id = ? AND patient_id = ?",
          [profile_id, row.profile_id]
        );
        
        // Add the prescriptions to the patient object.
        row.prescriptions = prescription;

        return row;
      })
    );



    console.log(patientWithPrescriptions);

     // Send a successful HTTP response (201 Created) with the patient list in JSON format.
    res.status(201).json({ patients: patientWithPrescriptions });
  } catch (error) {
     // Log the error and send an HTTP 400 Bad Request response with an error message.
    res.status(400).send({ message: "Error" });
  }
};

module.exports = { getMyPatientList };
