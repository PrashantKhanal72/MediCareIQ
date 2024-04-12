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
  host: 'bdqulp8gii8wi8ky6j3s-mysql.services.clever-cloud.com', // MySQL server host
  port:'3306',
  user: 'ufmibzvobk9w2gfz', 
  database: 'bdqulp8gii8wi8ky6j3s',
  password: 'kBHNt1fiw0SY7PtbiDsC', 
  waitForConnections: true, // Wait for connections if all are busy
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0 // Maximum number of queued requests (0 for no limit)
});

// Export the pool for use in other parts of the application.
module.exports = pool;
