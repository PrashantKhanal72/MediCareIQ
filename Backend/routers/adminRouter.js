const express = require("express"); // Import Express.js for routing.
const {
  createDoctor,
  getAllUsers,
  getSingleUsers,
  updateDoctorProfile,
  deleteDoctor,
} = require("../controllers/admin/doctorController"); // Import controller functions.
const { authenticateToken, isAdmin } = require("../middleware/auth"); // Import authentication and authorization middleware.
const upload = require("../middleware/uploadMiddleware"); // Import the file upload middleware.

const router = express.Router(); // Create a new Express router to define endpoints for admin-related actions.

//Fetches all users. Only accessible by authenticated and authorized (admin) users.
router.get("/all-users", authenticateToken, isAdmin, getAllUsers);

//Fetches a single user by ID. Requires admin rights.
router.get("/get-single-user/:id", authenticateToken, isAdmin, getSingleUsers);

//Creates a new doctor profile. Includes file upload for the profile image.
router.post("/create-doctor", authenticateToken, isAdmin,upload.single('profileImage'), createDoctor);

//Updates a doctor's profile. Admin access is required.
router.put(
  "/update-doctor/:id",
  authenticateToken,
  isAdmin,
  updateDoctorProfile
);


//Deletes a doctor's profile. Requires the user to be an admin.
router.delete("/delete-doctor/:id", authenticateToken, isAdmin, deleteDoctor);

module.exports = router;
