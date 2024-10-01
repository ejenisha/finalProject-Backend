// models/training.js
const mongoose = require('mongoose');

// Define the Training Schema
const trainingSchema = new mongoose.Schema({
  emp_id: { type: String, required: true },
  emp_name: { type: String, required: true },
  Training_id: { type: String, required: true },
  Training_name: { type: String, required: true },
  Trainer_name: { type: String, required: true },
});

// Create the Training model
const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;
