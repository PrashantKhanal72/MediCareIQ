const pool = require("../../database/db");

//  function to retrieve all appointments for the logged-in doctor.
const getAllAppointments = async (req, res) => {
  try {
     // Extract the user ID of the doctor from the request object
    const user_id = req.user.user_id;

    // Execute a SQL query to select all appointments from the database where the doctor_id matches the logged-in user's ID.
    const [result] = await pool.execute(
      "SELECT * FROM appointments WHERE doctor_id = ?",
      [user_id]
    );

    console.log(result);

    // Send a successful HTTP response (200 OK) with the appointment data in JSON format.
    res.status(200).json({ data: result });
  } catch (error) {
    // Log the error and send an HTTP 400 Bad Request response with an error message.
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

module.exports = { getAllAppointments };
