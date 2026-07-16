// Load environment variables from the .env file.
require("dotenv").config();

// Import the mysql2 library with promise support.
const mysql = require("mysql2/promise");

// Create a connection pool with configuration settings.
// Credentials are read from environment variables (see .env.example).
const pool = mysql.createPool({
  host: process.env.DB_HOST, // MySQL server host
  port: process.env.DB_PORT || "3306",
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true, // Wait for connections if all are busy
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0 // Maximum number of queued requests (0 for no limit)
});

// Export the pool for use in other parts of the application.
module.exports = pool;
