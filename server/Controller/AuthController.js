// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../Models/Usermodel");
// const nodemailer = require('nodemailer');

// exports.register = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (user) {
//             res.status(400).json({ msg: "User already exists" });
//         } else {
//             const salt = await bcrypt.genSalt();
//             const hashedPassword = await bcrypt.hash(password, salt);
//             const newUser = new User({
//                 name, email, password: hashedPassword
//             });
//             const savedUser = await newUser.save();
//             const token = jwt.sign(savedUser.id, process.env.Jwt_Token, { expiresIn: '10m' });
//             return res.status(200).json({ token, savedUser });
//         }
//     } catch (error) {
//         return res.status(400).json(error);
//     }
// };

// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) {
//             res.status(400).json({ msg: "User does not exists" });
//         }
//         else {
//             const comparePassword = await bcrypt.compare(password, user.password);
//             if (!comparePassword) {
//                 res.status(400).json({ msg: "Invalid credentials" });
//             } else {
//                 //generate a token-
//                 const token = jwt.sign({ id: user._id }, process.env.Jwt_Token, { expiresIn: '1d' });
//                 return res.status(200).json({ token, user });
//             }
//         }
//     } catch (error) {
//         return res.status(400).json(error);
//     }
// };

// exports.logout = async (req, res) => {
//     try {
//         res.clearCookie("token")
//         res.status(200).json({ msg: "Signout Successfully." })
//     } catch (error) {
//         return res.status(400).json(error);
//     }
// }

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/Usermodel");
const nodemailer = require("nodemailer");

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
        const verificationToken = jwt.sign({ email: savedUser.email }, process.env.Jwt_Token, {
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
        const token = jwt.sign({ id: user._id }, process.env.Jwt_Token, { expiresIn: "1d" });
        return res.status(200).json({ token, user });
    } catch (error) {
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
        const decoded = jwt.verify(token, process.env.Jwt_Token);

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
