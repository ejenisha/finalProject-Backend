
const mongoose = require("mongoose");

//Scores Schema
const scoresSchema = new mongoose.Schema({
  emp_id: { type: String, required: true, ref: "Employees" },
  emp_name: { type: String, required: true, ref: "Employees" },
  Training_id: { type: String, required: true, ref: "Training" },
  Training_name: { type: String, required: true, ref: "Training" },
  Trainer_name: { type: String, required: true, ref: "Training" },
  project_scores: { type: Number, required: true },
  comments: { type: String, required: true },
  time: { type: Number, required: true },
  requirements: { type: Number, required: true },
  hackerrank: { type: Number, required: true },
});

//Scores model
const Scores = mongoose.model("Scores", scoresSchema);

module.exports = Scores;
