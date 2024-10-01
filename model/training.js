// models/scores.js
const mongoose = require('mongoose');

// Define the Scores Schema
const trainingSchema = new mongoose.Schema({
  Training_id: { type: String, required: true},
  Training_name:{type:String,required:true}, // Foreign key reference
  Trainer_name: { type: String, required: true } // Foreign key reference

});

// Create the Scores model
const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;
