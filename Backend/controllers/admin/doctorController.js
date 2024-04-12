const pool = require("../../database/db");

// Get all user profiles from the database
const getAllUsers = async (req, res) => {
  try {
    // Execute SQL query to select all records from 'profile' table.
    const [profiles] = await pool.execute("SELECT * FROM profile");

    // Send HTTP status 200 and the list of user profiles in JSON format.
    res.status(200).json({ users: profiles });
  } catch (error) {
    // If an error occurs, send HTTP status 500 and error details.
    res
      .status(500)
      .send({ message: "Error fetching profiles", error: error.message });
  }
};

// Get a single user profile based on the profile ID.
const getSingleUsers = async (req, res) => {
  const { id } = req.params;

  try {
    const query = "SELECT * FROM profile WHERE profile_id = ?";
    const [profile] = await pool.execute(query, [id]);

    if (profile.length > 0) {
      // If profile found, send HTTP status 200 and the profile data in JSON format.
      res.status(200).json({ user: profile[0] });
    } else {
      // If profile not found, send HTTP status 404.
      res.status(404).send({ message: "Profile not found" });
    }
  } catch (error) {
    // If an error occurs, send HTTP status 500 and error details.
    res
      .status(500)
      .send({ message: "Error fetching profile", error: error.message });
  }
};

// Create a new doctor profile and corresponding auth record.
const createDoctor = async (req, res) => {
  // Destructure request body to get profile fields.
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      gender,
      age,
      address,
      speciality,
      doctor_type
    } = req.body;

    // Optional logging to check file upload (if part of the request).
    console.log(req.file);
    // Check if user with the given email already exists.
    const [users] = await pool.execute(
      "SELECT * FROM auth WHERE email = ? LIMIT 1",
      [email]
    );

    // If user exists, return an error.
    if (users.length > 0) {
      return res.status(401).json({ message: "User already registerd" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert new user into 'auth' table.
    const [newUser] = await pool.execute(
      "INSERT INTO auth (email, password, user_type) VALUES (?, ?, ?)",
      [email, hashedPassword, "doctor"]
    );

    // Insert new profile into 'profile' table.
    const [profileResponse] = await pool.execute(
      `INSERT INTO profile (
        auth_id,
        profileUrl,
        first_name,
        last_name,
        email,
        user_type,
        gender,
        age,
        address,
        speciality,
        doctor_type
        ) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        newUser.insertId,
        req.file.path,
        first_name,
        last_name,
        email,
        "doctor",
        gender,
        age,
        address,
        speciality,
        doctor_type
      ]
    );

    // Respond with status 201 and the newly created doctor profile.
    res.status(201).json({ doctor: profileResponse });
  } catch (error) {
    // If an error occurs, log it and send HTTP status 400 and error details.
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

// Update an existing doctor profile based on the profile ID.
const updateDoctorProfile = async (req, res) => {
  const { id } = req.params;
  const {
    auth_id,
    first_name,
    last_name,
    email,
    user_type,
    gender,
    age,
    address,
    speciality,
    doctor_type
  } = req.body;

  try {
    const query = `UPDATE profile SET 
      auth_id = ?, 
      first_name = ?, 
      last_name = ?, 
      email = ?, 
      user_type = ?, 
      gender = ?,
      age = ?,
      address = ?,
      speciality = ?,
      doctor_type = ?
      WHERE profile_id = ?`;
    const [result] = await pool.execute(query, [
      auth_id,
      first_name,
      last_name,
      email,
      user_type,
      gender,
      age,
      address,
      speciality,
      doctor_type,
      id,
    ]);

    if (result.affectedRows > 0) {
      // If profile updated successfully, send HTTP status 200.
      res.status(200).send({ message: "Profile updated successfully" });
    } else {
      // If profile not found, send HTTP status 404.
      res.status(404).send({ message: "Profile not found" });
    }
  } catch (error) {
    // If an error occurs, send HTTP status 500 and error details.
    res
      .status(500)
      .send({ message: "Error updating profile", error: error.message });
  }
};

// Delete a doctor profile and corresponding auth record based on the profile ID.
const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete profile from 'profile' table.
    const query = "DELETE FROM profile WHERE auth_id = ?";
    const [result] = await pool.execute(query, [id]);

    // Delete user from 'auth' table.
    const [response] = await pool.execute(
      "DELETE FROM auth WHERE user_id = ?",
      [id]
    );

    if (result.affectedRows > 0 && response.affectedRows > 0) {
      // If both profile and auth records are deleted, send HTTP status 200.
      res.status(200).send({ message: "Profile deleted successfully" });
    } else {
      // If profile not found, send HTTP status 404.
      res.status(404).send({ message: "Profile not found" });
    }

  } catch (error) {
    // If an error occurs, send HTTP status 500 and error details.
    res
      .status(500)
      .send({ message: "Error deleting profile", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUsers,
  createDoctor,
  updateDoctorProfile,
  deleteDoctor,
};
