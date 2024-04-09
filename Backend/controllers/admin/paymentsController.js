// Import the connection pool from the configured database file.
const pool = require("../../database/db");

// Define an asynchronous function to get all payment records from the database.
const getAllPayments = async (req, res) => {
  try {
    // Execute a query to select all records from the 'payments' table.
    const [rows] = await pool.query("SELECT * FROM payments");
    // Send HTTP status 200 and the retrieved payment records in JSON format.
    res.status(200).json({ payments: rows });
  } catch (error) {
    // If an error occurs, send HTTP status 500 and the error message in JSON format.
    res.status(500).json({ error: error.message });
  }
};

// Export the function to make it available for use in other parts of the application.
module.exports = { getAllPayments };
