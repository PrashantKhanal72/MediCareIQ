const pool = require("../../database/db");

// Fetch all schedule entries for the logged-in doctor.
const getScheduleList = async (req, res) => {
  const profile_id = req.user.profile_id; // Get doctor's profile ID from the authenticated user session.

  try {
    // Execute SQL query to fetch schedules.
    const [rows] = await pool.query(
      "SELECT * FROM schedules WHERE doctor_id = ?",
      [profile_id]
    );

    if (rows.length === 0) { // Check if no schedules were found.
      return res
        .status(404)
        .json({ message: "No schedules found for the specified doctor" });
    }
    res.json({ schedules: rows });  // Return the list of schedules.
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving schedules", error: error.message });
  }
};

// Fetch a specific schedule by its ID for the logged-in doctor.
const getScheduleById = async (req, res) => {
  const { id } = req.params; // Get schedule ID from URL parameters.
  const profile_id = req.user.profile_id; // Get doctor's profile ID.

  try {
    const [rows] = await pool.query( // Execute SQL query with schedule ID and doctor ID.
      "SELECT * FROM schedules WHERE schedule_id = ? AND doctor_id = ?",
      [id, profile_id]
    );

    if (rows.length === 0) { // Check if the schedule was found.
      return res
        .status(404)
        .json({ message: "No schedules found for the specified doctor" });
    }
    res.json({ schedules: rows }); // Return the found schedule.
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving schedule", error: error.message });
  }
};


// Create a new schedule entry for the logged-in doctor.
const createSchedule = async (req, res) => {
  const profile_id = req.user.profile_id;  // Get doctor's profile ID.
  const { availableDate, startTime, endTime } = req.body; // Get schedule details from request body.

  console.log(req.user);
  try {
    const [rows] = await pool.query( // Insert new schedule into the database.
      'INSERT INTO schedules (doctor_id, available_date, start_time, end_time, status) VALUES (?, ?, ?, ?, "available")',
      [profile_id, availableDate, startTime, endTime]
    );

    res.status(201).json({
      message: "Schedule created successfully",
      scheduleId: rows.insertId, // Return the ID of the created schedule.
    });

  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};


// Delete an existing schedule entry using its ID if it's available.
const deleteSchedule = async (req, res) => {
  const { scheduleId } = req.params; // Get schedule ID from URL parameters.

  try {
    await pool.query( // Execute SQL query to delete the schedule if it's marked as 'available'.
      'DELETE FROM schedules WHERE schedule_id = ? AND status = "available"',
      [scheduleId]
    );
    res.json({ message: "Schedule deleted successfully" }); // Confirm deletion.
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

module.exports = {
  getScheduleById,
  getScheduleList,
  createSchedule,
  deleteSchedule,
};
