const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  T_id: {
    type: String,
    required: true,
    unique: true
  },
  e_id: {
    type: mongoose.Schema.Types.String,
    ref: 'Employee',
    required: true
  },
  Training_name: {
    type: String,
    required: true
  },
  Trainer_name: {
    type: String,
    required: true
  },
  start_date: {
    type: String,
    required: true
  },
  end_date: {
    type: String,
    required: true
  }
});

const Training = mongoose.model('Training', trainingSchema);
module.exports = Training;
