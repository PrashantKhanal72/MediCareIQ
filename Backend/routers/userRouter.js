const express = require("express");
const {
  register,
  login,
  getProfile,
  registerNoProfile,
} = require("../controllers/user/userController"); // Import controller functions related to user actions.
const { authenticateToken } = require("../middleware/auth");  // Import the authentication middleware to protect routes
const upload = require("../middleware/uploadMiddleware"); // Import the middleware for handling file uploads.

const router = express.Router(); // Create a new router instance for user routes

 // Route for user login. No authentication needed here since it's the entry point for users.
router.post("/login", login);

// Route for user registration with profile image upload.
// 'upload.single('profileImage')' middleware processes the profile image upload.
router.post("/register",upload.single('profileImage'), register);

 // Route for user registration without creating a profile.
router.post("/register-no-profile", registerNoProfile);

// Route to get the user's profile information. It requires the user to be authenticated.
router.get("/profile", authenticateToken, getProfile);

module.exports = router;
