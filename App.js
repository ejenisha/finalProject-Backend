const express = require("express");
const dotenv = require("dotenv");
const scoreRoutes = require("./routes/scoreRoute");
const employeeRoutes = require("./routes/employeeRoute");
const trainingRoutes = require("./routes/trainingroute");
const accessRoutes = require("./routes/accessRouter");
const cors = require("cors");
const app = express();

app.use(cors());

// Load environment variables
dotenv.config({ path: "./config.env" });

// Middleware to parse JSON requests
app.use(express.json());

// Use trainer routes
app.use("/trainer", scoreRoutes);
app.use("/", scoreRoutes);
app.use("/", employeeRoutes);
app.use("/", trainingRoutes);
app.use("/", accessRoutes);
module.exports = app;
