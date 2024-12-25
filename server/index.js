// Imports
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv"); // For using process.env
const path = require("path");
const authRoute = require("./Routes/AuthRoute");

const app = express();
const PORT = 8080;

// Configurations
dotenv.config();
app.use(express.json());
app.use(cors({ credentials: true, origin: 'https://avtechfin.onrender.com' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Hosting
const dirname = path.resolve();

// Database
mongoose.set('strictQuery', false);
const mongoURL = `mongodb+srv://Taransh7:${process.env.MONGO_DB_PASSWORD}@cluster0.i6nn1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


mongoose.connect(mongoURL)
    .then(() => {
        console.log("Database connected successfully.");
    })
    .catch((error) => {
        console.error("Database connection failed:", error.message);
    });

// Routes
app.use("/user", authRoute);

// Hosting - Serve static files for frontend
app.use(express.static(path.join(dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(dirname, 'client', 'dist', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at PORT - ${PORT}`);
});
