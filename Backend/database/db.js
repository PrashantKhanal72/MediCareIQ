// Import the mysql2 library with promise support.
const mysql = require("mysql2/promise");

// Create a connection pool with configuration settings.
// const pool = mysql.createPool({
//   host: 'localhost', // MySQL server host
//   port:'3306',
//   user: 'root', 
//   database: 'my_dev_db',
//   password: '', 
//   waitForConnections: true, // Wait for connections if all are busy
//   connectionLimit: 10, // Maximum number of connections in the pool
//   queueLimit: 0 // Maximum number of queued requests (0 for no limit)
// });

const pool = mysql.createPool({
  host: 'bfflry5bb4qjegnsep7u-mysql.services.clever-cloud.com', // MySQL server host
  port:'3306',
  user: 'ubn9dkoqgxxe2loq', 
  database: 'bfflry5bb4qjegnsep7u',
  password: 'vJe4JaodXXngZmBWuZqV', 
  waitForConnections: true, // Wait for connections if all are busy
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0 // Maximum number of queued requests (0 for no limit)
});

// Export the pool for use in other parts of the application.
module.exports = pool;
