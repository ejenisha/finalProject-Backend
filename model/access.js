const mongoose = require("mongoose");

//Scores Schema
const accessSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  role: { type: String, required: true },
});

//Scores model
const Access = mongoose.model("Access", accessSchema);

module.exports = Access;
