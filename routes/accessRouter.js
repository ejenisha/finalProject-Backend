// routes/auth.js
const express = require('express');
const accessRoutes = require('../controller/accessController'); // Import login controller

const router = express.Router();

// POST /login route
router.post('/login', accessRoutes.login); //login
router.post('/register',accessRoutes.createTrainer) //add trainers

module.exports = router;
