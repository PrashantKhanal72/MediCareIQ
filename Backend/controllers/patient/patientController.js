const pool = require("../../database/db");

// Function to get information about a specific doctor by ID, including their schedules.
const getDoctorById = async (req, res) => {
  const { id } = req.params; // Extract the doctor's ID from the request parameters.

  try {
    // Fetch the doctor's profile from the database using their ID.
    console.log("Helo");
    const [doctors] = await pool.execute(
      "SELECT * FROM profile WHERE user_type = 'doctor' AND profile_id = ?",
      [id]
    );

    // Fetch schedules for each doctor and add them to the doctor object.
    const doctorsWithSchedules = await Promise.all(
      doctors.map(async (doctor) => {
        const [schedules] = await pool.execute(
          "SELECT * FROM schedules WHERE doctor_id = ?",
          [doctor.profile_id]
        );
        
        doctor.schedules = schedules; // Assign fetched schedules to the doctor object.

        return doctor;
      })
    );

    // Respond with the doctor and their schedules.
    res.status(200).json({ doctors: doctorsWithSchedules });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

// Function to get a list of all doctors and their schedules.
const getDoctorList = async (req, res) => {
  try {
    // Fetch all doctor profiles from the database.
    console.log("Helo");
    const [doctors] = await pool.execute(
      "SELECT * FROM profile WHERE user_type = 'doctor'"
    );

    // Fetch schedules for each doctor and add them to the doctor object.
    const doctorsWithSchedules = await Promise.all(
      doctors.map(async (doctor) => {
        const [schedules] = await pool.execute(
          "SELECT * FROM schedules WHERE doctor_id = ?",
          [doctor.profile_id]
        );
        doctor.schedules = schedules; // Assign fetched schedules to the doctor object.

        return doctor;
      })
    );

    // Respond with the list of doctors and their schedules.
    res.status(200).json({ doctors: doctorsWithSchedules });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

module.exports = { getDoctorById, getDoctorList };
