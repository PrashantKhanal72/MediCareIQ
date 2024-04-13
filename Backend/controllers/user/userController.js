const pool = require("../../database/db");
const jwt = require("jsonwebtoken"); // Used for generating and verifying JSON Web Tokens (JWT).
const bcrypt = require("bcrypt");

//Authenticates users and provides a JWT for session management.
const login = async (req, res) => {
  const { email, password } = req.body;  // Extract email and password from request body.

  try {
    const [users] = await pool.execute( // Query the database for a user with the provided email.
      "SELECT * FROM auth WHERE email = ? LIMIT 1",
      [email]
    );

    if (users.length === 0) { // Check if user exists.
      return res.status(404).json({ message: "User not registerd" });
    }
    // User exists, now compare the password
    // Get the user object.
    const user = users[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
    // Compare the provided password with the stored one.
      return res.status(401).json({ message: "Incorrect password" });
    }
    console.log(user);
    const [profile] = await pool.execute( // Retrieve the user's profile.
      "SELECT * FROM profile WHERE auth_id = ? LIMIT 1",
      [user.user_id]
    );

    console.log(profile[0]);

    // Generate a JWT with user information.
    const token = jwt.sign(
      {
        user_id: user.user_id,
        profile_id: profile[0].profile_id,
        user_type: user.user_type,
      },
      "secretKey",
      {
        expiresIn: "10d", // Token expires in 10 days.
      }
    );

    res.status(201).json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};


// Registers a new user and automatically creates a profile.
const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      gender,
      age,
      address,
      dieseses,
    } = req.body;

    console.log(req.file);

    // Check if the email is already registered.

    const [users] = await pool.execute(
      "SELECT * FROM auth WHERE email = ? LIMIT 1",
      [email]
    );

    if (users.length > 0) {
      return res.status(401).json({ message: "User already registerd" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert a new user into the 'auth' table.
    const [newUser] = await pool.execute(
      "INSERT INTO auth (email, password, user_type) VALUES (?, ?, ?)",
      [email, hashedPassword, "patient"]
    );

     // Insert a new profile linked to the new user.
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
      dieseses
      ) VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [
        newUser.insertId,
        req.file.path,
        first_name,
        last_name,
        email,
        "patient",
        gender,
        age,
        address,
        dieseses,
      ]
    );

    // Generate a JWT for the new user.
    const token = jwt.sign(
      {
        user_id: newUser.insertId,
        profile_id: profileResponse.insertId,
        user_type: "patient",
      },
      "secretKey",
      {
        expiresIn: "10d", // Token expiration time
      }
    );

    res.status(201).json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const registerNoProfile = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      gender,
      age,
      address,
      dieseses,
    } = req.body;



    const [users] = await pool.execute(
      "SELECT * FROM auth WHERE email = ? LIMIT 1",
      [email]
    );

    if (users.length > 0) {
      return res.status(401).json({ message: "User already registerd" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const [newUser] = await pool.execute(
      "INSERT INTO auth (email, password, user_type) VALUES (?, ?, ?)",
      [email, hashedPassword, "patient"]
    );

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
      dieseses
      ) VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [
        newUser.insertId,
        "image path",
        first_name,
        last_name,
        email,
        "patient",
        gender,
        age,
        address,
        dieseses,
      ]
    );
    const token = jwt.sign(
      {
        user_id: newUser.insertId,
        profile_id: profileResponse.insertId,
        user_type: "patient",
      },
      "secretKey",
      {
        expiresIn: "10d", // Token expiration time
      }
    );

    res.status(201).json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

// Retrieves the profile information for the authenticated user.
const getProfile = async (req, res) => {
  try {
    const user_id = req.user.user_id; // Get user ID from the authenticated user.

    const [profile] = await pool.execute( // Retrieve the user's profile from the database.
      "SELECT * FROM profile WHERE auth_id = ?",
      [user_id]
    );

    res.status(200).json({ profile: profile });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

module.exports = { login, register, getProfile,registerNoProfile };
