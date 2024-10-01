// routes/trainerRoutes.js
const express = require('express');
const trainingController = require('../controller/trainingcontroller');

const router = express.Router();

// Define the route for entering training scores
router.post('/enterscore', trainingController.enterTrainingScore);

module.exports = router;
