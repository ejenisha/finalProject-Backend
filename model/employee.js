// models/scores.js
const mongoose = require("mongoose");

// Define the Scores Schema
const employeeSchema = new mongoose.Schema({
  emp_id: { type: String, unique: true, required: true, ref: "Training" },
  emp_name: { type: String, required: true }, 
  designation: { type: String, required: true },
});

// Create the Scores model
const Employees = mongoose.model("Employees", employeeSchema);

module.exports = Employees;
