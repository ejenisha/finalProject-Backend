// routes/trainerRoutes.js
const express = require('express');
const scoreController = require('../controller/scoreController');

const router = express.Router();

// Define the route for entering training scores
router.post('/enterscore', scoreController.enterTrainingScore);
router.get('/viewscore',scoreController.getAllScores)
router.get('/emptrainingcount',scoreController.getemployeeTrainingCount)
router.get('/projectscores',scoreController.projectscores)
router.get('/avgscores',scoreController.avgscores)
router.get('/getReport',scoreController.getEmployeeReport)
router.get('/getTopScores',scoreController.getTopScoresByTraining)
module.exports = router;
