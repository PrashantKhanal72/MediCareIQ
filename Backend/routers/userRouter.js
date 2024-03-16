const express = require("express");
const { createUser, register } = require("../controllers/user/userController");

const router = express.Router();

router.get("/create", createUser);
router.post("/login", createUser);
router.post("/register", register);

module.exports = router;
