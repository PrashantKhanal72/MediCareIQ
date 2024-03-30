const express = require("express");
const {
  createDoctor,
  getAllUsers,
  getSingleUsers,
  updateDoctorProfile,
  deleteDoctor,
} = require("../controllers/admin/doctorController");
const { authenticateToken, isAdmin } = require("../middleware/auth");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/all-users", authenticateToken, isAdmin, getAllUsers);
router.get("/get-single-user/:id", authenticateToken, isAdmin, getSingleUsers);
router.post("/create-doctor", authenticateToken, isAdmin,upload.single('profileImage'), createDoctor);
router.put(
  "/update-doctor/:id",
  authenticateToken,
  isAdmin,
  updateDoctorProfile
);
//send auth_id from profile table
router.delete("/delete-doctor/:id", authenticateToken, isAdmin, deleteDoctor);

module.exports = router;
