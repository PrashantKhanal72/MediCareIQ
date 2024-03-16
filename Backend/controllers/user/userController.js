const pool = require("../../database/db");

const createUser = async (req, res) => {
  // const { firstName, last_name, email } = req.body;
  try {
    const firstName = "roshan";
    const last_name = "chaudhary";
    const email = "roshan@gmail.com";
    // const [rows, fields] = await pool.query('SELECT email FROM users WHERE email = ? LIMIT 1', [email]);
    // return rows.length > 0;
    const [result, fields] = await pool.execute(
      "INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?)",
      [firstName, last_name, email]
    );
    // const [rows, fields] = await pool.query('SELECT * FROM users');
    console.log(result);
    console.log(fields);

    // const newUser =  pool.query("SELECT * FROM users WHERE id = ?", [
    //   result.insertId,
    // ]);
    res.status(201).json({ message: "done" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const login = async (req, res) => {
  // const { firstName, last_name, email } = req.body;
  try {
    const firstName = "roshan";
    const last_name = "chaudhary";
    const email = "roshan@gmail.com";
    // const [rows, fields] = await pool.query('SELECT email FROM users WHERE email = ? LIMIT 1', [email]);
    // return rows.length > 0;
    const [result, fields] = await pool.execute(
      "INSERT INTO users (first_name, last_name, email) VALUES (?, ?, ?)",
      [firstName, last_name, email]
    );
    // const [rows, fields] = await pool.query('SELECT * FROM users');
    console.log(result);
    console.log(fields);

    // const newUser =  pool.query("SELECT * FROM users WHERE id = ?", [
    //   result.insertId,
    // ]);
    res.status(201).json({ message: "done" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

const register = async (req, res) => {
  
  try {
    console.log(req.body)
    const { first_name, last_name, email,password } = req.body;
    const response = await pool.query(
      "SELECT email FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    console.log(response[0])
    if (response[0].length > 0) {
      return res.status(401).json({ message: "User already registerd" });
    }
    const [result, fields] = await pool.execute(
      "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?,?)",
      [first_name, last_name, email,password]
    );
    const userObject = {
      user_id: result.user_id,
      first_name: first_name,
      last_name: last_name,
      email: email,
    };
    res.status(201).json({ userObject: "userObject" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error" });
  }
};

module.exports = { createUser, login, register };
