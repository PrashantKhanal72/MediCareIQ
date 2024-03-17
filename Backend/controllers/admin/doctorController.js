const pool = require("../../database/db");

const createDoctor = async (req, res) => {
  try {
    console.log(req.body);
    const { first_name, last_name, email, password } = req.body;

    const [users] = await pool.execute(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (users.length > 0) {
      return res.status(401).json({ message: "User already registerd" });
    }
    const [result, fields] = await pool.execute(
      "INSERT INTO users (first_name, last_name, email, password, user_type) VALUES (?, ?, ?,?,?)",
      [first_name, last_name, email, password, "doctor"]
    );
    const userObject = {
      user_id: result.insertId,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    };

    res.status(201).json({ doctor: userObject });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

module.exports = { createDoctor };
