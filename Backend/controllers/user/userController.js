const pool = require("../../database/db");
const jwt = require("jsonwebtoken");


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [users] = await pool.execute(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not registerd" });
    }
    // User exists, now compare the password
    const user = users[0];

    if (password !== user.password) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    console.log(user);

    const token = jwt.sign(
      {
        user_id: user.user_id,
        user_type: user.user_type,
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

const register = async (req, res) => {
  try {
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
      [first_name, last_name, email, password, "patient"]
    );

    const token = jwt.sign(
      {
        user_id: result.insertId,
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

module.exports = { login, register };
