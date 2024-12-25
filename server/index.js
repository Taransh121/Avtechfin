// //Imports
// const mongoose = require("mongoose");
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const dotenv = require("dotenv"); //For using process.env
// const app = express();
// const PORT = 8080;
// const authRoute = require("./Routes/AuthRoute")
// const path = require("path");

// //Configurations
// dotenv.config();
// app.use(express.json());
// app.use(cors());
// app.use(cors({ credentials: true, origin: 'https://avtechfin.onrender.com' }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// //Hosting
// const dirname = path.resolve();

// //Database
// mongoose.set('strictQuery', false);
// const mongoURL = `mongodb+srv://Taransh7:${process.env.MONGO_DB_PASSWORD}@cluster0.i6nn1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// mongoose.connect(mongoURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("Database connected.");
// }).catch((error) => {
//     console.log(error);
// });

// //Routes
// app.use("/user", authRoute);

// //Hosting-
// app.use(express.static(path.join(dirname, '/client/dist')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(dirname, 'client', 'dist', 'index.html'));
// })

// app.listen(PORT, () => {
//     console.log(`Server running at PORT - ${PORT}`);
// });

// Imports
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv"); // For using process.env
const path = require("path");
const authRoute = require("./Routes/AuthRoute");

const app = express();
const PORT = process.env.PORT || 8080; // Use process.env.PORT for compatibility with hosting platforms

// Configurations
dotenv.config();
app.use(express.json());
app.use(cors({ credentials: true, origin: 'https://avtechfin.onrender.com' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Hosting
const dirname = path.resolve();

// Database
mongoose.set('strictQuery', false); // Keeps queries predictable for future versions
const mongoURL = `mongodb+srv://Taransh7:${process.env.MONGO_DB_PASSWORD}@cluster0.i6nn1.mongodb.net/Cluster0?retryWrites=true&w=majority`;

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
