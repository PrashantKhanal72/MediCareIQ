// Import the connection pool from the configured database file.
const pool = require("../../database/db");

// Define an asynchronous function to create a new appointment in the database.
const createAppointment = async (req, res) => {
  try {
    // Extract user_id from the request's user object and other details from the request body.
    const user_id = req.user.user_id;
    const { doctor_id,description, appointment_time } = req.body;

     // Execute an SQL query to insert the new appointment record into the database.
    const [result] = await pool.execute(
      "INSERT INTO appointments (patient_id, doctor_id,description, appointment_time) VALUES (?, ?, ?,?)",
      [user_id, doctor_id, description, appointment_time]
    );

    // Create an object to represent the new appointment.
    const appointmentObject = {
      appointment_id: result.insertId,
      doctor_id: doctor_id,
      description: description,
      appointment_time: appointment_time
    };

    // Respond with HTTP status 200 and the new appointment object in JSON format.
    res.status(200).json({ data: appointmentObject });
  } catch (error) {
     // Log the error and respond with HTTP status 400 and an error message.
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

module.exports={ createAppointment };  