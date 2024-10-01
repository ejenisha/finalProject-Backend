const express = require('express');
const dotenv = require('dotenv');
const trainerRoutes = require('./routes/trainingroute');

const app = express();

// Load environment variables
dotenv.config({ path: './config.env' });

// Middleware to parse JSON requests
app.use(express.json());

// Use trainer routes
app.use('/trainer', trainerRoutes);

module.exports = app;
