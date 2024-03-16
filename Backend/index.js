// Import express
const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouter = require("./routers/userRouter.js")
const pool = require("./database/db.js")
// Create an express application
const app = express();

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'dev_user', // Example using the root user
//   database: 'my_dev_db', // Example database name
//   password: 'password', // The password you've set for your MySQL user
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });


// Define a port
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


// Set the maximum payload size to 50MB for JSON and URL-encoded data
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());

// Define a route for the root path
app.get('/', (req, res) => {
  res.send('Hello World! how are you');
});

app.use("/api/v1/user", userRouter);

// Optionally check the database connection before starting the server
async function startServer() {
    try {
      await pool.query('SELECT 1'); // Simple query to check connection

      console.log('Database connection has been established successfully.');
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer();

