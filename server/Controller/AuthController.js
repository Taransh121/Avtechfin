const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/Usermodel");
const nodemailer = require("nodemailer");
const { log } = require("node:console");

// Signup with Email Verification
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user to the database (unverified by default)
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            verified: false, // Add this field in your schema if not already present
        });
        const savedUser = await newUser.save();

        // Generate a verification token (valid for 10 minutes)
        const verificationToken = jwt.sign({ email: savedUser.email }, process.env.JWT_TOKEN, {
            expiresIn: "10m",
        });

        // Send verification email
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL, // Your email address
                pass: process.env.PASSWORD, // Your email password
            },
        });

        // const verificationLink = `http://localhost:8080/user/verify?token=${verificationToken}`;
        const verificationLink = `https://avtechfin.onrender.com/user/verify?token=${verificationToken}`;
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: savedUser.email,
            subject: "Verify Your Email",
            html: `<p>Click the link below to verify your email:</p>
             <a href="${verificationLink}">Verify Email</a>
             <p>This link will expire in 10 minutes.</p>`,
        });

        return res.status(201).json({ msg: "User registered. Verification email sent." });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error during registration." });
    }
};

// Login with Email Verification Check
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        // Check if the user's email is verified
        if (!user.isVerified) {
            return res.status(403).json({ msg: "Email not verified. Please verify your email first." });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        // Generate a JWT for authenticated sessions
        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, { expiresIn: "1d" });
        return res.status(200).json({ token, user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error during login." });
    }
};

// Logout
exports.logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ msg: "Logged out successfully." });
    } catch (error) {
        return res.status(500).json({ error: "Server error during logout." });
    }
};

// Email Verification Endpoint
exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        // Find and update the user's verification status
        const user = await User.findOneAndUpdate(
            { email: decoded.email },
            { isVerified: true },
            { new: true }
        );

        if (!user) {
            return res.status(400).json({ msg: "Invalid token or user not found." });
        }

        return res.status(200).json({ msg: "Email verified successfully." });
    } catch (error) {
        return res.status(400).json({ msg: "Invalid or expired token." });
    }
};
