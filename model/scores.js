// models/scores.js
const mongoose = require('mongoose');

// Define the Scores Schema
const scoresSchema = new mongoose.Schema({
  emp_id: { type: String, required: true, ref: 'Training' }, // Foreign key reference
  Training_id: { type: String, required: true, ref: 'Training' }, // Foreign key reference
  Trainer_name: { type: String, required: true, ref: 'Training' }, // Foreign key reference
  scores: { type: Number, required: true },
  comments: { type: String, required: true },
  coding: { type: Number, required: true },
  requirements: { type: Number, required: true },
  documentation: { type: Number, required: true },
});

// Create the Scores model
const Scores = mongoose.model('Scores', scoresSchema);

module.exports = Scores;
