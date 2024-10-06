// routes/trainerRoutes.js
const express = require('express');
const scoreController = require('../controller/scoreController');
const router = express.Router();

// Define the route for entering training scores
router.post('/enterscore', scoreController.enterTrainingScore);  //enter score
router.get('/viewscore',scoreController.getAllScores) //get all scores
router.get('/emptrainingcount',scoreController.getemployeeTrainingCount)  //get employee count by training
// router.get('/projectscores',scoreController.projectscores)
router.get('/avgscores',scoreController.avgscores) //total avg scores of all trainings
router.get('/getReport',scoreController.getEmployeeReport) //individual employee report
router.get('/getTopScores',scoreController.getTopScoresByTraining) //top project scores by training
router.get('/getEmpId',scoreController.employeeId)
router.get('/getEmployeeCount',scoreController.getAllEmployeeCount)
module.exports = router;
