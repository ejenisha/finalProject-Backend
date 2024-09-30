const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
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
  feedback: {
    type: String,
    required: true
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
