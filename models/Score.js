const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  e_id: {
    type: mongoose.Schema.Types.String,
    ref: 'Training',
    required: true
  },
  T_id: {
    type: mongoose.Schema.Types.String,
    ref: 'Training',
    required: true
  },
  score: {
    type: String,
    required: true
  },
  Trainer_name: {
    type:String,
    required: true
  }
});

const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;
