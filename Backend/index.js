// Import express
const express = require("express"); // Express framework for handling HTTP requests.
const path = require("path"); // Node.js path module for handling file paths.
const bodyParser = require("body-parser"); // Middleware to parse request bodies
const cors = require("cors"); // Middleware to enable CORS (Cross-Origin Resource Sharing).
const cookieParser = require("cookie-parser"); // Middleware to parse cookies.
const http = require("http"); // Node.js HTTP module to create HTTP server.
const socketIo = require("socket.io"); // Library to enable real-time bidirectional event-based communication.

//database connection pool.
const pool = require("./database/db.js");

// Import routers for different parts of the application.
const userRouter = require("./routers/userRouter.js");
const appointmentRouter = require("./routers/appointmentRouter.js");
const adminRouter = require("./routers/adminRouter.js");
const doctorRouter = require("./routers/doctorRouter.js");
const patientRouter = require("./routers/patientRouter.js");

// Setup Express application and HTTP server.
const app = express(); // Initialize the Express application.
const server = http.createServer(app); // Create an HTTP server using Express.

// Configure Socket.io for real-time communication between clients and server.
const io = socketIo(server, {
  path: "/api/v1/socket.io", // Define the path for Socket.io server to listen on.
  cors: {
    origin: process.env.FRONTEND_URL, // Set the allowed origin for CORS.
  },
  pingTimeout: 7000, // Time in ms without a ping before closing the connection.
  pingInterval: 3000, // Time in ms between pings.
});

// Set server configuration, views, and static file directory.
const PORT = 3001; // Define the port number on which the server will listen.

app.set("views", path.join(__dirname, "views"));  // Set the directory for views.
app.set("view engine", "pug"); // Set the template engine "pug"

// Serve static files from the 'uploads' directory.
app.use("/uploads", express.static("uploads")); // Make 'uploads' folder accessible.

// Use middleware to parse JSON and URL-encoded request bodies, handle CORS, and parse cookies.
app.use(bodyParser.json({ limit: "50mb" })); // Limit for parsed request bodies.
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // Parse URL-encoded bodies.

// Configure CORS policy.
app.use(
  cors({
    origin: [ // Define allowed origins for CORS.
      "http://localhost:3000",
      "https://medi-care-iq.vercel.app",
      "*",
    ],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allowed HTTP methods.
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed custom headers.
  })
);
app.use(express.json()); // Parse JSON bodies.
app.use(cookieParser()); // Parse cookies from the request headers.


// Setup real-time event handling with Socket.io.
const onlineUsers = {}; // Object to track online users.

// Handle new socket connections.
io.on("connection", (socket) => {
  console.log("New client connected");

  // Handle client disconnection.
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    delete onlineUsers[socket.username]; // Remove user from online list.
    io.emit("updateOnlineUsers", Object.keys(onlineUsers)); // Update online users list.
  });

  // Handle setting of username for the connected socket.
  socket.on("setUsername", (username) => {
    socket.username = username; // Assign username to socket session.
    onlineUsers[username] = socket.id; // Map username to socket ID.
    console.log(onlineUsers);
    io.emit("updateOnlineUsers", Object.keys(onlineUsers)); // Update online users list.
  });

   // Handle call initiation.
  socket.on("callUser", (data) => {
    console.log("Started new call", data);
    const calleeSocketId = onlineUsers[data.calleeUsername]; // Get callee's socket ID.

    io.to(calleeSocketId).emit("incomingCall", { // Notify callee of incoming call.
      callerUsername: socket.username,
      offer: data.offer,
      token:data.token
    });
  });

  // Handle call acceptance.
  socket.on("acceptCall", (data) => {
    const callerSocketId = onlineUsers[data.callerUsername]; // Get caller's socket ID.

    io.to(callerSocketId).emit("callAccepted", data.answer); // Notify caller that call was accepted.
  });

  // Handle ICE candidate exchange.

  socket.on("iceCandidate", (data) => {
    const targetSocketId = onlineUsers[data.targetUsername]; // Get target user's socket ID.

    io.to(targetSocketId).emit("iceCandidate", data.candidate); // Send ICE candidate to target user.
  });
});


// Define a root route for the server.
app.get("/", (req, res) => {
  res.send("Hello World! how are you"); // Send a simple text response.
});

// Setup routing for different application modules.
app.use("/api/v1/admin", adminRouter); // Routes for admin functionality.
app.use("/api/v1/user", userRouter); // Routes for user functionality.
app.use("/api/v1/appointment", appointmentRouter); // Routes for appointment functionality.
app.use("/api/v1/doctor", doctorRouter); // Routes for doctor functionality.
app.use("/api/v1/patient", patientRouter); // Routes for patient functionality.

// Function to start the server with database connection verification.
async function startServer() {
  try {
    await pool.query("SELECT 1"); // Check the database connection by executing a simple query.
    console.log("Database connection has been established successfully.");
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);  // Start the server and listen on defined port.
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error); // Log any database connection errors.
  }
}

startServer();  // Call the function to start the server.
