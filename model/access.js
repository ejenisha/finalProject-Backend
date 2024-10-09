// models/scores.js
const mongoose = require('mongoose');

// Define the Scores Schema
const accessSchema = new mongoose.Schema({
  email: { type: String,unique:true },
  password:{type:String}, // Foreign key reference
  role:{type:String,required:true}
});

// Create the Scores model
const Access = mongoose.model('Access', accessSchema);


module.exports = Access;
