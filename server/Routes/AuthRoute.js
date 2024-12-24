// const express = require("express");
// const { register, login, logout } = require("../Controller/AuthController");
// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", logout);

// module.exports = router;

const express = require("express");
const { register, login, logout, verifyEmail } = require("../Controller/AuthController"); // Add `verifyEmail`
const router = express.Router();

// Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", verifyEmail); // New route for email verification

module.exports = router;
