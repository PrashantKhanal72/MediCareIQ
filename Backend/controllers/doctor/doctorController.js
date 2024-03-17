const pool = require("../../database/db");

const getAllAppointments = async (req, res) => {
    try {
      const user_id = req.user.user_id;
      const { doctor_id,description, appointment_time } = req.body;
      const [result, fields] = await pool.execute(
        "SELECT * FROM appointments WHERE doctor_id = ?",
        [user_id]
      );
      console.log(result)
    //   const appointmentObject = {
    //     appointment_id: result.insertId,
    //     doctor_id: doctor_id,
    //     description: description,
    //     appointment_time: appointment_time
    //   };

      res.status(200).json({ data: result });
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: "Error" });
    }
  };
module.exports={getAllAppointments}  