const pool = require("../../database/db");

// Function to book an available schedule for the logged-in patient.
const bookSchedule = async ( req,res ) => {

  try {
    const profile_id = req.user.profile_id; // Get the patient's profile ID from the authenticated user.
    const { scheduleId } = req.params; // Extract the schedule ID from the request parameters.

    // Attempt to update the schedule's status to 'booked' in the database for the given schedule ID.
    const [rows] = await pool.query(
      'UPDATE schedules SET Status = "booked", patient_id = ? WHERE schedule_id = ? AND status = "available"',
      [profile_id, scheduleId]
    );

    // Check if the schedule was successfully booked.
    if (rows.affectedRows === 0) {
      // If no rows were affected, the schedule was not available for booking.
      return res.status(404).json({ message: 'Schedule not available for booking' });
    }

    // If booking was successful, return a success message.
    res.json({ message: 'Schedule booked successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

module.exports={ bookSchedule };