//Imports
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv"); //For using process.env
const app = express();
const PORT = 8080;
const authRoute = require("./Routes/AuthRoute")
const path = require("path");

//Configurations
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Hosting
const dirname = path.resolve();

//Database
mongoose.set('strictQuery', false);
const mongoURL = `mongodb+srv://Taransh7:${process.env.MONGO_DB_PASSWORD}@cluster0.i6nn1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected.");
}).catch((error) => {
    console.log(error);
});

//Routes
app.use("/user", authRoute);

//Hosting-
app.use(express.static(path.join(dirname, '/client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(dirname, 'client', 'dist', 'index.html'));
})

app.listen(PORT, () => {
    console.log(`Server running at PORT - ${PORT}`);
});