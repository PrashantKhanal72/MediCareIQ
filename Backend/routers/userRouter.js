const express = require("express");
const {
  register,
  login,
  getProfile,
  registerNoProfile,
} = require("../controllers/user/userController");
const { authenticateToken } = require("../middleware/auth");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/login", login);
router.post("/register",upload.single('profileImage'), register);
router.post("/register-no-profile", registerNoProfile);
router.get("/profile", authenticateToken, getProfile);

module.exports = router;
