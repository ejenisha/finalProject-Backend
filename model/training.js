const mongoose = require('mongoose');

// Define the Scores Schema
const trainingSchema = new mongoose.Schema({
  Training_id: { type: String, unique: true, required: true },
  Training_name: { type: String, required: true }, 
  Trainer_name:{type:String,required:true},
  progress: { type: String, required: true, default: 'In progress' } 
});

// Create the Training model
const Training = mongoose.model('Training', trainingSchema);

module.exports = Training;
