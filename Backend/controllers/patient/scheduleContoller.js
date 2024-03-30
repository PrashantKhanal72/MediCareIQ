const pool = require("../../database/db");

const bookSchedule = async ( req,res ) => {

  try {
    const profile_id = req.user.profile_id;
    const { scheduleId } = req.params;

    const [rows] = await pool.query(
      'UPDATE schedules SET Status = "booked", patient_id = ? WHERE schedule_id = ? AND status = "available"',
      [profile_id, scheduleId]
    );

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: 'Schedule not available for booking' });
    }

    res.json({ message: 'Schedule booked successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

module.exports={ bookSchedule };