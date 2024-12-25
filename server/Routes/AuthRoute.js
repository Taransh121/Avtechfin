const express = require("express");
const { register, login, logout, verifyEmail } = require("../Controller/AuthController");
const router = express.Router();

// Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", verifyEmail);

module.exports = router;
