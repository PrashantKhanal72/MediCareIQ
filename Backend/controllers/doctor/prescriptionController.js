const pool = require("../../database/db");

// asynchronous function to create a new prescription in the database.
const prescribe = async (req, res) => {
  try {

    // Extract the doctor's profile ID from the authenticated user's information and patient details from the request body.
    const profile_id = req.user.profile_id;
    const { patient_id, description } = req.body;

    // Execute an SQL query to insert a new record into the 'prescription' table.
    const [result] = await pool.execute(
      "INSERT INTO prescription ( doctor_id, patient_id, description) VALUES (?, ?, ?)",
      [profile_id, patient_id, description]
    );

    console.log(result);

    
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { prescribe };
